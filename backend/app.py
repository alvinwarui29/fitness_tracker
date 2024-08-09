from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import Config
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db = MySQL(app)

def get_user_email(email):
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM users WHERE email=%s ",(email,))
    user = cur.fetchone()
    cur.close()
    cur.close()
    return user

@app.route("/login",methods=['POST'])
def login():
    user= request.get_json()
    email = user.get('email')
    password = user.get('password')

    luser=get_user_email(email)
    if luser:
        hashed_password = luser["password"]
        if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token), 200
        else:
            return jsonify({"message": "Invalid email or password 1"}), 400
    else:
        return jsonify({"message": "Invalid email or password"}), 400
    

# REGISTER USER
@app.route("/register",methods=['POST'])
def register():
    user = request.get_json()
    name = user.get('name')
    email = user.get ('email')
    password = user.get('password')
    
    cur = db.connection.cursor()
    cur.execute("INSERT INTO users(name,email,password) VALUES (%s,%s,%s) ",(name,email,password))
    

    if cur.rowcount == 1:
        db.connection.commit()
        message = 'Item added successfully!'
        status_code = 201
    else:
        message = 'Failed to add item.'
        status_code = 500
        
    cur.close()
        
    return jsonify({'message': message}), status_code
    


if __name__ == '__main__':
    app.run(debug=True)