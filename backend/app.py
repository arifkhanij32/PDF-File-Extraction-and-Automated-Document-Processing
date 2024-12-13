from flask import Flask
from flask_cors import CORS  # Import Flask-CORS
from extensions import db, jwt
from config import Config
from flask_migrate import Migrate
from routes.auth_routes import auth_bp
from models import User
from routes.auth_routes import auth_bp
from routes.file_routes import file_bp
from routes.template_routes import template_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True, resources={
    r"/*": {"origins": "http://localhost:3000", "allow_headers": ["Authorization", "Content-Type"]}
})
# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
# Initialize extensions

# Initialize extensions
db.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(file_bp, url_prefix="/files")  # Corrected prefix
app.register_blueprint(template_bp, url_prefix="/template-keys")


@app.route("/")
def index():
    return {"message": "Welcome to the API!"}

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
