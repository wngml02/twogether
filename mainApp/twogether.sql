CREATE DATABASE TWOGETHER;
USE TWOGETHER;

CREATE TABLE userTable (
   username varchar(255) NOT NULL,
    num varchar(255) NOT NULL,
   id varchar(50) NOT NULL,
    password varchar(255) NOT NULL
    #PRIMARY KEY(id)
);

CREATE TABLE treeTable (
   username varchar(255) NOT NULL,
   step int NOT NULL,
    participation int NOT NULL
);

UPDATE treeTable SET step = 1 WHERE participation < 10;
UPDATE treeTable SET step = 2 WHERE participation >= 10 AND participation < 20;
UPDATE treeTable SET step = 3 WHERE participation >= 20 AND participation < 35;
UPDATE treeTable SET step = 4 WHERE participation >= 35;

ALTER TABLE usertable ADD CONSTRAINT id UNIQUE (id);

SELECT * FROM userTable;
SELECT * FROM treeTable;

# 세팅
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;

SHOW GRANTS FOR 'root'@'localhost';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;