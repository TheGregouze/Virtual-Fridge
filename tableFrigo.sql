CREATE TABLE tbProduits(
prodId	varchar(3) NOT NULL,
prodName varchar(30) NOT NULL,
CONSTRAINT pkProd PRIMARY KEY(prodId),
);

CREATE TABLE tbClients(
prodId	varchar(3) NOT NULL,
prodName varchar(30) NOT NULL,
CONSTRAINT pkClient PRIMARY KEY(frigId),
);

CREATE TABLE tbFrigos(
frigId	varchar(3) NOT NULL,
prodId	varchar(3) NOT NULL,
quantite varchar(3) NOT NULL,
CONSTRAINT pkFrig PRIMARY KEY(frigId,prodId),
CONSTRAINT fkFrig FOREIGN KEY(frigId) REFERENCES tbClients(frigId) on delete restrict,
CONSTRAINT fkFrigo FOREIGN KEY(prodId) REFERENCES tbProduits(prodId) on delete restrict,
);

CREATE TABLE tbRecettes(
recId varchar(3) NOT NULL,
recName varchar(30) NOT NULL,
CONSTRAINT pkRec PRIMARY KEY(recId),
);
 
CREATE TABLE tbRecettesEtProduits(
recId varchar(3) NOT NULL,
prodId	varchar(3) NOT NULL,
CONSTRAINT pkRecProd PRIMARY KEY(prodId,recId),
CONSTRAINT fkRecProd FOREIGN KEY(recId) REFERENCES tbRecettes(recId) on delete restrict,
CONSTRAINT fkRecProds FOREIGN KEY(prodId) REFERENCES tbProduits(prodId) on delete restrict,
);
