CREATE TABLE tbUnites(
unitID varchar(3) NOT NULL,
unitLib varchar (8),
CONSTRAINT pkUnit PRIMARY KEY(unitID),
);

CREATE TABLE tbUsers(
usrID varchar(3) NOT NULL,
usrName varchar(30) NOT NULL,
usrKey varchar(20) NOT NULL,
CONSTRAINT pkUsr PRIMARY KEY(usrID),
);

CREATE TABLE tbRecettes(
rctID varchar(3),
rctLib varchar(30),
CONSTRAINT pkRct PRIMARY KEY(rctID),
);

CREATE TABLE tbProduits(
prodID varchar(3) NOT NULL,
prodLib varchar(30) NOT NULL,
unitID varchar(3) NOT NULL,
CONSTRAINT pkProd PRIMARY KEY(prodID),
CONSTRAINT fkProdUnit FOREIGN KEY(unitID) REFERENCES tbUnites(unitID) on delete restrict,
);

CREATE TABLE tbRecettesProduits(
rctID varchar(3) NOT NULL,
prodID	varchar(3) NOT NULL,
CONSTRAINT pkRecProd PRIMARY KEY(prodId,rctID),
CONSTRAINT fkRecProdRec FOREIGN KEY(rctID) REFERENCES tbRecettes(rctID) on delete restrict,
CONSTRAINT fkRecProdProd FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
);

CREATE TABLE tbFrigo(
usrID	varchar(3) NOT NULL,
prodID	varchar(3) NOT NULL,
quantite varchar(3) NOT NULL,
CONSTRAINT pkUsrProd PRIMARY KEY(usrID, prodID),
CONSTRAINT fkFrigoProd FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
CONSTRAINT fkFrigoUsr FOREIGN KEY(usrID) REFERENCES tbUsers(usrID) on delete restrict,
);


------------------

