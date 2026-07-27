from flask import Flask
from flask_cors import CORS

from backend.routes.match_routes import match_bp


def create_app():
    app = Flask(__name__)
    CORS(app)  # allow the React frontend (different port) to call this API
    app.register_blueprint(match_bp)

    @app.route("/health")
    def health():
        return {"status": "ok"}

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
