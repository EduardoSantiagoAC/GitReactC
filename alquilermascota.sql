CREATE DATABASE alquiler_mascotas;
USE alquileres_mascotas;

CREATE TABLE pet(
    id INT IDENTITY(1,1) PRIMARY KEY, -- Genera automáticamente valores únicos
    name NVARCHAR(255) NOT NULL,      -- Usamos NVARCHAR para admitir Unicode
    type NVARCHAR(100),               -- Usamos NVARCHAR también aquí
    age INT,                          -- Edad como entero
    rental_price DECIMAL(10, 2),      -- Precio con dos decimales
    available BIT DEFAULT 1           -- Usamos BIT para valores booleanos (1 = TRUE, 0 = FALSE)
);


