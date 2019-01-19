CREATE DATABASE database_links;
USE database_links;

/*creando tablas*/
--TABLA DE USERS
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);
/*alter table modifica una columna de la tabla*/
ALTER TABLE users
    ADD PRIMARY KEY (id);
/* que mis id se vayan autoincrementando*/
ALTER TABLE users
    MODIFY  id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

DESCRIBE users;

----LINKS TABLE
CREATE TABLE links (
    id INT(11) NOT NULL,
    tittle VARCHAR(150) NOT NULL,
    url VARCHAR (255) NOT NULL,
    description TEXT,
    user_id INT (11),--este campo crea la relacion con la tabla users 
    created_at timestamp NOT NULL DEFAULT current_timestamp,-- aqui apenas se cree un registro este campo se creara solo 
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)--LLAVE FORANEA 
);
ALTER TABLE links
    ADD PRIMARY KEY (id);
ALTER TABLE links
    MODIFY  id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
DESCRIBE links;