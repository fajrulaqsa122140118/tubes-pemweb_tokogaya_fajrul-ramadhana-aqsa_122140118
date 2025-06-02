from pyramid.config import Configurator

def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        
        # CORS support
        def add_cors_headers_response_callback(event):
            def cors_headers(request, response):
                response.headers.update({
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization,X-Requested-With',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Max-Age': '1728000',
                })
            event.request.add_response_callback(cors_headers)
        
        config.add_subscriber(add_cors_headers_response_callback, 'pyramid.events.NewRequest')
        
        config.include('.routes')
        config.include('.models')
        config.scan()
    return config.make_wsgi_app()