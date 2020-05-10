INSERT INTO tbUnites values
(001, ''),
(002, 'g'),
(003, 'ml');

INSERT INTO tbUsers values
(default,'Jon', 'key'),
(default,'user', 'pass'),
(default,'magnus', 'chive');
  
INSERT INTO tbProduits values
(1,'oeuf',1),
(2,'farine',2),
(3,'riz',2),
(4,'beurre',2),
(5,'gouse ail',1),
(6,'fromage',2),
(7,'lait',3),
(8,'champignon',2),
(9,'thon',2),
(10,'peche',1),
(11,'poulet',2),
(12,'laitue',2),
(13,'huile vegetale',3),
(14,'vinaigre',3),
(15,'oignon',1),
(16, 'banane',1);

INSERT INTO tbRecettes values
(1,'Risotto Champignon'),
(2,'Riz saute poulet'),
(3,'Crepes'),
(4,'Pain a la banane'),
(5,'Poulet frit'),
(6, 'Peche au Thon');

INSERT INTO tbRecettesProduits values

(1, 3, 200),
(1, 4, 10),
(1, 5, 2),
(1, 15, 1),
(1, 8, 250),
(2, 1, 1),
(2, 3, 300),
(2, 5, 2),
(2, 8, 50),
(2, 11, 250),
(2, 13, 10),
(2, 15, 1),
(3, 1, 3),
(3, 2, 300),
(3, 13, 30),
(3, 4, 20),
(3, 7, 600),
(4, 1, 1),
(4, 2, 200),
(4, 13, 30),
(4, 16, 3),
(5, 11, 400),
(5, 2, 200),
(5,13, 500),
(6, 9, 50),
(6, 10, 1);
