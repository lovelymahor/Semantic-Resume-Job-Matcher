import os
from flask import Flask
from flask_cors import CORS

from backend.routes.match_routes import match_bp


def create_app():
    app = Flask(__name__)

    # Enable CORS
    CORS(app)

    # Register API routes
    app.register_blueprint(match_bp)

    @app.route("/")
    def home():
        return {
            "message": "Semantic Resume Job Matcher API is running!",
            "status": "success"
        }

    @app.route("/health")
    def health():
        return {
            "status": "ok"
        }

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )