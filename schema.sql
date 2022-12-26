CREATE DATABASE plans;
USE plans;

CREATE TABLE plan(
    id INT AUTO_INCREMENT PRIMARY KEY,
    furniture VARCHAR(65535) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO plan (furniture) VALUES('[{ shape: "circle", x: 10, y: 10, width: 40 }, { shape: "rectangle", x: 80, y: 10, width: 140, height: 30 }]');