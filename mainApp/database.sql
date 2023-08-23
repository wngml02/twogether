CREATE DATABASE TWOGETHER;
USE TWOGETHER;

DROP TABLE userTable;

CREATE TABLE userTable (
	username varchar(255) NOT NULL,
    num int NOT NULL,
	id varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE treeTable (
	sprout int NOT NULL ,
    smallTree int NOT NULL,
    tree int NOT NULL,
    forest int NOT NULL
);

ALTER TABLE treeTable ADD CONSTRAINT sprout CHECK (sprout < 10);
ALTER TABLE treeTable ADD CONSTRAINT smallTree
CHECK (smallTree >= 10 AND smallTree < 20);
ALTER TABLE treeTable ADD CONSTRAINT tree
CHECK (tree >= 20 AND tree < 35);
ALTER TABLE treeTable ADD CONSTRAINT forest
CHECK (forest >= 35);

SELECT * FROM userTable;
SELECT * FROM treeTable;