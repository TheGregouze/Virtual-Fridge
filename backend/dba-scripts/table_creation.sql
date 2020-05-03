CREATE TABLE tbProduits(
prodID varchar(3) NOTNULL,
prodLib varchar(30) NOT NULL,
CONSTRAINT pkProd PRIMARY KEY(prodID),
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

CREATE TABLE tbFrigos(
frigID	varchar(3) NOT NULL,
prodID	varchar(3) NOT NULL,
quantite varchar(3) NOT NULL,
CONSTRAINT pkFrig PRIMARY KEY(frigID),
CONSTRAINT fkFrig FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
);

CREATE TABLE tbRecettesEtProduits(
recID varchar(3) NOT NULL,
prodID	varchar(3) NOT NULL,
CONSTRAINT pkRecProd PRIMARY KEY(prodId,recID),
CONSTRAINT fkRecProd FOREIGN KEY(rctID) REFERENCES tbRecettes(rctID) on delete restrict,
CONSTRAINT fkRecProds FOREIGN KEY(prodID) REFERENCES tbProduits(prodID) on delete restrict,
);

