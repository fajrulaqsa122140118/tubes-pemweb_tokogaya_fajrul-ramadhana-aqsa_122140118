def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # API routes
    config.add_route('register', '/api/register')
    config.add_route('login', '/api/login')
    config.add_route('profile', '/api/profile')
    config.add_route('get_users', '/api/users')
    config.add_route('create_user', '/api/users/create')
    
    # Order routes - PENTING: urutan route matters!
    config.add_route('clear_orders', '/api/orders/clear')  # Harus sebelum route dengan {id}
    config.add_route('get_orders', '/api/orders')
    config.add_route('create_order', '/api/orderss')
    config.add_route('edit_order', '/api/orders/{id}')
    config.add_route('delete_order', '/api/ordersss/{id}')