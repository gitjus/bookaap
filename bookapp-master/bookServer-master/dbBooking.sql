USE bookApp

DROP DATABASE bookApp;

CREATE DATABASE bookApp;

USE bookApp

CREATE TABLE users (
  id int,
  tipo varchar(255),
  usuario varchar(255) PRIMARY KEY,
  contraseña varchar(255)
);

CREATE TABLE tipos (
  id int PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(255)
);

CREATE TABLE estadisticas (
  id int PRIMARY KEY AUTO_INCREMENT,
  servicio varchar(255),
  citasCanceladas int,
  citasCompletadas int,
  citasReservadas int
);

CREATE TABLE empresas (
  id int,
  NIT varchar(255) PRIMARY KEY,
  nombre varchar(255),
  dueño varchar(255),
  horarios varchar(255),
  telefono int
);

CREATE TABLE sedes (
  id int PRIMARY KEY AUTO_INCREMENT,
  estadistica int,
  empleados varchar(255),
  ubicaciones varchar(255),
  fotos varchar(255),
  nEmpleados int,
  servicios int,
  empresa varchar(255)
);

CREATE TABLE reservas (
  id int PRIMARY KEY AUTO_INCREMENT,
  servicio varchar(255),
  cliente varchar(255),
  fecha varchar(255),
  info varchar(255),
  horaInicio varchar(255),
  duracion varchar(255),
  sede int
);

CREATE TABLE servicios (
  id int,
  tipo varchar(255),
  descripcion varchar(255),
  costo int,
  sede int,
  empresa varchar(255),
  encargado varchar(255),
  ref varchar(255) PRIMARY KEY
);

CREATE TABLE canchas (
  id int PRIMARY KEY AUTO_INCREMENT,
  tipo varchar(255),
  reservaciones int
);

CREATE TABLE profesionales (
  id int PRIMARY KEY AUTO_INCREMENT,
  userId varchar(255),
  especialidad varchar(255),
  sede int,
  reservaciones int,
  telefono int,
  nombre varchar(255),
  email varchar(255)
);

CREATE TABLE restaurant (
  id int PRIMARY KEY AUTO_INCREMENT,
  totalmesas int,
  sede int,
  reservaciones int
);

CREATE TABLE comandas (
  id int PRIMARY KEY AUTO_INCREMENT,
  numerodemesa int,
  platos int,
  restaurant int,
  reservacion int
);

CREATE TABLE platos (
  id int PRIMARY KEY AUTO_INCREMENT,
  costo int,
  descripcion varchar(255),
  fotos varchar(255)
);

ALTER TABLE estadisticas ADD FOREIGN KEY (servicio) REFERENCES servicios (ref);

ALTER TABLE empresas ADD FOREIGN KEY (dueño) REFERENCES users (usuario);

ALTER TABLE sedes ADD FOREIGN KEY (estadistica) REFERENCES estadisticas (id);

ALTER TABLE profesionales ADD FOREIGN KEY (sede) REFERENCES sedes (id);

ALTER TABLE servicios ADD FOREIGN KEY (sede) REFERENCES sedes (id);

ALTER TABLE servicios ADD FOREIGN KEY (empresa) REFERENCES empresas (NIT);

ALTER TABLE sedes ADD FOREIGN KEY (empresa) REFERENCES empresas (NIT);

ALTER TABLE reservas ADD FOREIGN KEY (servicio) REFERENCES servicios (ref);

ALTER TABLE reservas ADD FOREIGN KEY (sede) REFERENCES sedes (id);

ALTER TABLE servicios ADD FOREIGN KEY (encargado) REFERENCES users (usuario);

ALTER TABLE reservas ADD FOREIGN KEY (cliente) REFERENCES users (usuario);

ALTER TABLE canchas ADD FOREIGN KEY (reservaciones) REFERENCES reservas (id);

ALTER TABLE profesionales ADD FOREIGN KEY (userId) REFERENCES users (usuario);

ALTER TABLE profesionales ADD FOREIGN KEY (reservaciones) REFERENCES reservas (id);

ALTER TABLE restaurant ADD FOREIGN KEY (sede) REFERENCES sedes (id);

ALTER TABLE restaurant ADD FOREIGN KEY (reservaciones) REFERENCES reservas (id);

ALTER TABLE comandas ADD FOREIGN KEY (platos) REFERENCES platos (id);

ALTER TABLE comandas ADD FOREIGN KEY (restaurant) REFERENCES restaurant (id);

ALTER TABLE comandas ADD FOREIGN KEY (reservacion) REFERENCES reservas (id);

INSERT INTO users (id, usuario, contraseña, tipo) VALUES
(1, "bookAdmin", "$2y$12$4FkzO8zJv9PhkQgKsNz8BeMAAdaYJYZP0OuSDAbzqyK0wNvC5Dvsa", "Admin"),
(2, "bookEmpleado", "$2y$12$4FkzO8zJv9PhkQgKsNz8BeMAAdaYJYZP0OuSDAbzqyK0wNvC5Dvsa", "Empleado");
(3, "bookEmpresa", "$2y$12$4FkzO8zJv9PhkQgKsNz8BeMAAdaYJYZP0OuSDAbzqyK0wNvC5Dvsa", "Empre");

INSERT INTO empresas (id, NIT, nombre, dueño, horarios, telefono) VALUES 
(1, "01", "Peluqueria La mano de Dios", "bookAdmin", "6:00am/6:00pm", 12121212),
(2, "02", "Clinica Los Rios", "bookAdmin", "6:00am/6:00pm", 12121212),
(3, "03", "Canchas La Rinconada", "bookAdmin", "6:00am/6:00pm", 12121212),
(4, "04", "Los pollos hermanos", "bookAdmin", "6:00am/6:00pm", 12121212);

INSERT INTO servicios (id, tipo, descripcion, costo, empresa, ref) VALUES 
(1, "Entretenimiento", "Alquiler de cancha", 2000, "03", "0/-/03");

INSERT INTO servicios (id, tipo, descripcion, costo, empresa, encargado, ref) VALUES 
(2, "Belleza", "Sesion de manicura", 1000, "01", "bookAdmin", "1/bookAdmin/01"),
(3, "Salud", "Consulta con el dentista", 1500, "02", "bookAdmin", "2/bookAdmin/02");

INSERT INTO tipos (id, nombre) VALUES
(1, "Admin"),
(2, "Empleado");