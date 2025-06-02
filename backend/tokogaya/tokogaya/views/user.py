from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models.user import User
import json

# Add OPTIONS handler for CORS preflight
@view_config(route_name='register', request_method='OPTIONS')
def register_options(request):
    response = Response()
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization,X-Requested-With',
    })
    return response

@view_config(route_name='register', renderer='json', request_method='POST')
def register(request):
    dbsession = request.dbsession
    try:
        data = request.json_body
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            request.response.status = 400
            return {'message': 'Username, email dan password harus diisi'}

        # Check for existing username
        existing_user = dbsession.query(User).filter_by(username=username).first()
        if existing_user:
            request.response.status = 400
            return {'message': 'Username sudah digunakan'}
            
        # Check for existing email
        existing_email = dbsession.query(User).filter_by(email=email).first()
        if existing_email:
            request.response.status = 400
            return {'message': 'Email sudah digunakan'}

        new_user = User(username=username, email=email, password=password)
        dbsession.add(new_user)
        dbsession.flush()  # Ensure the user is saved

        return {'message': 'Registrasi berhasil'}

    except Exception as e:
        request.response.status = 500
        return {'message': 'Server error', 'error': str(e)}


@view_config(route_name='login', request_method='OPTIONS')
def login_options(request):
    response = Response()
    response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization,X-Requested-With',
    })
    return response

@view_config(route_name='login', renderer='json', request_method='POST')
def login(request):
    print("=== LOGIN REQUEST RECEIVED ===")
    dbsession = request.dbsession
    try:
        print("Getting JSON body...")
        data = request.json_body
        print(f"Received data: {data}")
        
        username = data.get('username')
        password = data.get('password')
        print(f"Username: {username}, Password: {'*' * len(password) if password else 'None'}")

        if not username or not password:
            print("Username or password missing")
            request.response.status = 400
            return {'message': 'Username dan password harus diisi'}

        print("Querying database...")
        user = dbsession.query(User).filter_by(username=username).first()
        print(f"User found: {user is not None}")
        
        if not user:
            print("User not found")
            request.response.status = 401
            return {'message': 'Username atau password salah'}
            
        if user.password != password:
            print("Password mismatch")
            request.response.status = 401
            return {'message': 'Username atau password salah'}

        print("Login successful, returning user data")
        return {
            'message': 'Login berhasil',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }

    except Exception as e:
        print(f"ERROR in login: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        request.response.status = 500
        return {'message': 'Server error', 'error': str(e)}

@view_config(route_name='profile', renderer='json', request_method='GET')
def profile_view(request):
    dbsession = request.dbsession
    try:
        # Karena gak pakai session, kamu bisa ambil user_id dari query parameter
        user_id = request.params.get('user_id')
        if not user_id:
            request.response.status = 400
            return {'message': 'User ID diperlukan'}

        user = dbsession.query(User).filter_by(id=user_id).first()
        if not user:
            request.response.status = 404
            return {'message': 'User tidak ditemukan'}

        return {
            'username': user.username,
            'email': user.email
        }

    except Exception as e:
        request.response.status = 500
        return {'message': 'Server error', 'error': str(e)}