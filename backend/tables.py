from flask import Flask
from flask_mysqldb import MySQL
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = MySQL(app)

def create_tables():
    with app.app_context():
        cur = db.connection.cursor()
        cur.execute("""
                    CREATE TABLE IF NOT EXISTS users(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
                    );
                    
                    """)
        cur.execute("""
        CREATE TABLE IF NOT EXISTS target_muscle (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE
        );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS exercise (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            category_id INT NOT NULL,
            no_of_reps INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (category_id) REFERENCES target_muscle(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        """)
        db.connection.commit()
        cur.close()
if __name__ == '__main__':
    create_tables()
    print("Tables created successfully!")