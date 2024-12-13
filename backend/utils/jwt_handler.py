from flask_jwt_extended import jwt_required, get_jwt_identity

def protected_route(func):
    @jwt_required()
    def wrapper(*args, **kwargs):
        user = get_jwt_identity()
        return func(user, *args, **kwargs)
    return wrapper
