DROP DATABASE IF EXISTS registeredUsersdb;

CREATE DATABASE registeredUsersdb;
use registeredUsersdb;
CREATE TABLE users (
name VARCHAR(45),
 email VARCHAR(50),
 password VARCHAR(15)
 );