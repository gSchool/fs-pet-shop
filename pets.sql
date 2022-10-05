DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
pet_id serial,
age int,
kind varchar(30),
pet_name varchar(30)
);

INSERT INTO pets (age, kind, pet_name) VALUES 
(7, 'rainbow', 'fido'),
(5, 'snake', 'buttons'),
(3, 'dog', 'fluffy');