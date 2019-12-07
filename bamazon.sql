DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    itemid INTEGER NOT NULL,
    productname VARCHAR
    (45) NOT NULL,
    departmentname VARCHAR
    (45) NOT NULL,
    price DECIMAL
    (10 , 2 ) NOT NULL,
    stockquantity INTEGER
    (10) NOT NULL,
    PRIMARY KEY
    (itemid)
);

Select *
FROM products;

INSERT INTO products
    (productname, departmentname, price, stockquantity)
VALUES
    ('Iphone 7', 'Cell Phones', 599.99, 25),
    ('Iphone 7 Plus', 'Cell Phones', 699.99, 35),
    ('Iphone 8', 'Cell Phones', 799.99, 45),
    ('Iphone 8 Plus', 'Cell Phones', 899.99, 55),
    ('Iphone X', 'Cell Phones', 1099.99, 65),
    ('Iphone XR', 'Cell Phones', 1199.99, 75),
    ('Iphone XS', 'Cell Phones', 1249.99, 75),
    ('Iphone XS Max', 'Cell Phones', 1299.99, 85),
    ('Iphone 11', 'Cell Phones', 1399.99, 95),
    ('Iphone 11 Pro', 'Cell Phones', 1499.99, 100),
    ('Iphone 11 Pro Max', 'Cell Phones', 1599.99, 100)