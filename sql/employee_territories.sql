CREATE TABLE IF NOT EXISTS EmployeeTerritories (
    EmployeeID INTEGER REFERENCES Employees(EmployeeID) NOT NULL,
    TerritoryID INTEGER REFERENCES Territories(TerritoryID) NOT NULL
);