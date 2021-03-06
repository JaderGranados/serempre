CREATE TABLE IF NOT EXISTS Products(
    ProductID INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    ProductName VARCHAR(40) NOT NULL,
    SupplierID INTEGER REFERENCES Suppliers(SupplierID) NOT NULL,
    CategoryID INTEGER REFERENCES Categories(CategoryID) NOT NULL,
    QuantityPerUnit VARCHAR(20) NOT NULL,
    UnitPrice DECIMAL(15, 4) NOT NULL,
    UnitsInStock SMALLINT NOT NULL,
    UnitsOnOrder SMALLINT NOT NULL,
    RecorderLevel SMALLINT NOT NULL,
    Discontinued BOOLEAN NOT NULL
);