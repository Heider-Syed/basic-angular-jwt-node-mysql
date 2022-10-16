CREATE DATABASE angular_jwt;

USE angular_jwt;

CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE posts(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    body VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)
);

select * from users;
select * from posts;

SELECT u.id AS USERID, U.username , p.id AS POSTID, p.title, p.body, p.created
FROM users u
INNER JOIN posts p
ON p.user_id = u.id;