create database university;
use university;

create table users(
  id varchar(255) primary key,
  password varchar(255) not null,
  token varchar(255) not null
);

create table bookings (
  booked_at date primary key,
  booked_by varchar(255) not null,
  FOREIGN KEY (booked_by) REFERENCES users(id)
);