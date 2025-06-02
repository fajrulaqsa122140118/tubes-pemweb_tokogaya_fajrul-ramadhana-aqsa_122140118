from pyramid.view import view_config
from pyramid.response import Response
from ..models.order import Order
from sqlalchemy.exc import DBAPIError
import transaction
import json

# Handler untuk CORS preflight request
@view_config(route_name='create_order', request_method='OPTIONS')
def create_order_options(request):
    return Response()

@view_config(route_name='get_orders', request_method='OPTIONS')
def get_orders_options(request):
    return Response()

@view_config(route_name='edit_order', request_method='OPTIONS')
def edit_order_options(request):
    return Response()

@view_config(route_name='delete_order', request_method='OPTIONS')
def delete_order_options(request):
    return Response()

@view_config(route_name='clear_orders', request_method='OPTIONS')
def clear_orders_options(request):
    return Response()

@view_config(route_name='create_order', renderer='json', request_method='POST')
def create_order(request):
    dbsession = request.dbsession
    try:
        data = request.json_body  # daftar produk dari frontend (array of items)

        if not isinstance(data, list):
            request.response.status = 400
            return {'message': 'Data harus berupa list'}

        for item in data:
            new_order = Order(
                product_name=item.get('name'),
                quantity=item.get('quantity'),
                category=item.get('category'),
                total_price=item.get('total')
            )
            dbsession.add(new_order)

        # Gunakan transaction manager untuk commit
        transaction.commit()
        return {'message': 'Pesanan berhasil disimpan'}

    except DBAPIError as e:
        transaction.abort()  # Rollback menggunakan transaction manager
        request.response.status = 500
        return {'error': str(e)}
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'error': 'Terjadi kesalahan: ' + str(e)}
        
# Get all orders
@view_config(route_name='get_orders', renderer='json', request_method='GET')
def get_orders(request):
    dbsession = request.dbsession
    try:
        orders = dbsession.query(Order).all()
        order_list = []
        for order in orders:
            order_list.append({
                'id': order.id,
                'product_name': order.product_name,
                'quantity': order.quantity,
                'category': order.category,
                'total_price': order.total_price
            })
        return {'orders': order_list}
    except Exception as e:
        request.response.status = 500
        return {'error': str(e)}

# Edit order (update quantity)
@view_config(route_name='edit_order', renderer='json', request_method='PUT')
def edit_order(request):
    dbsession = request.dbsession
    try:
        order_id = request.matchdict['id']
        data = request.json_body
        
        order = dbsession.query(Order).filter(Order.id == order_id).first()
        if not order:
            request.response.status = 404
            return {'error': 'Order tidak ditemukan'}
        
        new_quantity = data.get('quantity')
        if new_quantity and new_quantity > 0:
            # Hitung ulang total price berdasarkan quantity baru
            price_per_item = order.total_price / order.quantity
            order.quantity = new_quantity
            order.total_price = price_per_item * new_quantity
            
            transaction.commit()
            return {'message': 'Order berhasil diupdate'}
        else:
            request.response.status = 400
            return {'error': 'Quantity harus lebih dari 0'}
            
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'error': str(e)}

# Delete specific order
@view_config(route_name='delete_order', renderer='json', request_method='DELETE')
def delete_order(request):
    dbsession = request.dbsession
    try:
        order_id = request.matchdict['id']
        
        order = dbsession.query(Order).filter(Order.id == order_id).first()
        if not order:
            request.response.status = 404
            return {'error': 'Order tidak ditemukan'}
        
        dbsession.delete(order)
        transaction.commit()
        return {'message': 'Order berhasil dihapus'}
        
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'error': str(e)}

# Clear all orders
@view_config(route_name='clear_orders', renderer='json', request_method='DELETE')
def clear_orders(request):
    dbsession = request.dbsession
    try:
        dbsession.query(Order).delete()
        transaction.commit()
        return {'message': 'Semua order berhasil dihapus'}
        
    except Exception as e:
        transaction.abort()
        request.response.status = 500
        return {'error': str(e)}