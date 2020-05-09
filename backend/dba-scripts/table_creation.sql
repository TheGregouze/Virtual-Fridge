CREATE TABLE tbUnites(
unitID int NOT NULL,
unitLib varchar(16) NOT NULL,
CONSTRAINT pkUnit PRIMARY KEY(unitID),
);

CREATE TABLE tbUsers(
usrID int NOT NULL DEFAULT AUTOINCREMENT,
usrName varchar(30) NOT NULL,
usrKey varchar(20) NOT NULL,
CONSTRAINT pkUsr PRIMARY KEY(usrID),
);

CREATE TABLE tbRecettes(
rctID int NOT NULL,
rctLib varchar(30),
CONSTRAINT pkRct PRIMARY KEY(rctID),
);

CREATE TABLE tbProduits(
prodID int NOT NULL,
prodLib varchar(30) NOT NULL,
unitID int NOT NULL,
CONSTRAINT pkProd PRIMARY KEY(prodID),
CONSTRAINT fkProdUnit FOREIGN KEY(unitID) REFERENCES tbUnites(unitID) on delete restrict,
);

CREATE TABLE tbRecettesProduits(
rctID int NOT NULL,
prodID int NOT NULL,
prodQuant int NOT NULL,
CONSTRAINT pkRecProd PRIMARY KEY(prodID,rctID),
CONSTRAINT fkRecProdRec FOREIGN KEY(rctID) REFERENCES tbRecettes(rctID) on delete restrict,
CONSTRAINT fkRecProdProd FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
);

CREATE TABLE tbFrigo(
usrID	int NOT NULL,
prodID	int NOT NULL,
prodQuant int NOT NULL,
CONSTRAINT pkUsrProd PRIMARY KEY(usrID, prodID),
CONSTRAINT fkFrigoProd FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
CONSTRAINT fkFrigoUsr FOREIGN KEY(usrID) REFERENCES tbUsers(usrID) on delete restrict,
);
