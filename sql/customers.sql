CREATE TABLE IF NOT EXISTS Customers(
    CustomerID CHAR(5) PRIMARY KEY CHECK (CustomerID <> ''),
    CompanyName VARCHAR(40) NOT NULL,
    ContactName VARCHAR(30) NOT NULL,
    ContactTitle VARCHAR(30) NOT NULL,
    Address VARCHAR(60) NOT NULL,
    City VARCHAR(15) NOT NULL,
    Region VARCHAR(15),
    PostalCode VARCHAR(10),
    Country VARCHAR(15) NOT NULL,
    Phone VARCHAR(24) NOT NULL,
    Fax VARCHAR(24)
);