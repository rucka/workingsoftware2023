from server import app
import logging
import route

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3002, debug=True)
    app.logger.setLevel(logging.DEBUG)
