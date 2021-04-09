CREATE TABLE IF NOT EXISTS CustomerCustomerDemo (
    CustomerID CHAR(5) REFERENCES Customers(CustomerID) NOT NULL,
    CustomerTypeID INTEGER REFERENCES CustomerDemographics(CustomerTypeID) NOT NULL
);