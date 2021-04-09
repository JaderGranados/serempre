CREATE TABLE IF NOT EXISTS OrderDetails(
    OderID INTEGER REFERENCES Orders(OrderID) NOT NULL,
    ProductID INTEGER REFERENCES Products(ProductID) NOT NULL,
    UnitPrice DECIMAL(15, 4) NOT NULL,
    Quantity SMALLINT NOT NULL,
    Discount FLOAT NOT NULL
);