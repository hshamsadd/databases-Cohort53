-- PostgreSQL dump converted from MySQL
--
-- Host: localhost    Database: imdb
-- ------------------------------------------------------
-- Originally from MySQL 5.7.17, converted to PostgreSQL format

-- Set standard conforming strings
SET standard_conforming_strings = on;

-- Connect to the imdb database or create it
-- DROP DATABASE IF EXISTS imdb; -- Uncomment if needed
-- CREATE DATABASE imdb;
-- \c imdb;

BEGIN;

--
-- Table structure for table actors
--

DROP TABLE IF EXISTS actors;
CREATE TABLE actors (
  aid SERIAL PRIMARY KEY,
  aname VARCHAR(50) DEFAULT NULL,
  biography TEXT,
  won_oscar BOOLEAN DEFAULT FALSE
);

--
-- Dumping data for table actors
--

INSERT INTO actors VALUES (1,'Brad Pitt','lot of adopted children',FALSE),(2,'Orlando Bloom','',FALSE),(3,'Arnold Schwartzenegger','body builder',FALSE),(4,'Elpidia Carrillo','Nothing',FALSE);

--
-- Table structure for table movies
--

DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  mid SERIAL PRIMARY KEY,
  mname VARCHAR(50) DEFAULT NULL,
  release_date DATE DEFAULT NULL,
  rating INTEGER DEFAULT NULL
);

--
-- Dumping data for table movies
--

INSERT INTO movies VALUES (1,'Predator','1987-06-12',9),(2,'Troy','2004-05-14',8);

--
-- Table structure for table roles
--

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  aid INTEGER NOT NULL,
  mid INTEGER NOT NULL,
  rname VARCHAR(50) DEFAULT NULL,
  rid SERIAL PRIMARY KEY
);

--
-- Dumping data for table roles
--

INSERT INTO roles VALUES (1,2,'Achilees',1),(2,2,'Paris',2),(3,1,'someone',4),(4,1,'someone else',5);

COMMIT;

-- Add foreign key constraints after data is loaded
ALTER TABLE roles ADD CONSTRAINT roles_movies_fk 
  FOREIGN KEY (mid) REFERENCES movies (mid);

ALTER TABLE roles ADD CONSTRAINT roles_actors_fk 
  FOREIGN KEY (aid) REFERENCES actors (aid);

-- Add indexes for better performance
CREATE INDEX roles_mid_idx ON roles (mid);
CREATE INDEX roles_aid_idx ON roles (aid);

-- Dump completed on 2018-09-30 15:01:25 (converted to PostgreSQL format)
