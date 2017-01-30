create database pois;
use database pois;
create table poi (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name TEXT NOT NULL, coord_x INT NOT NULL, coord_y INT NOT NULL);
insert into poi (name, coord_x, coord_y) values ('testePOI', 27, 14)