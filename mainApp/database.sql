SHOW TABLES;

DROP TABLE userTable;

CREATE TABLE userTable (
	username varchar(255) NOT NULL,
    num int NOT NULL,
	id varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY(id)
);