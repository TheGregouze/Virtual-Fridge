insert into tbProduits values
(001,'oeuf'),
(002,'fromage'),
(003,'lait'),
(004,'champignon'),
(005,'lardon'),
(006,'thon'),
(007,'peche'),
(008,'ketchup'),
(009,'mayonnaise'),
(010,'poulet'),
(011,'salade'),
(012,'moutarde'),
(013,'huile'),
(014,'vinaigre');

insert into tbClients values
(001,'TheGregouze','secret'),
(002,'Liambeau','mystere'),
(003,'Hysteria','absent'),
(004,'Seb','noidea');

insert into tbRecettes values
(001,'Salade César'),
(002,'Pêches aux thons'),
(003,'Omelette');

insert into tbRecettesEtProduits values
(003,001),
(003,002),
(003,003),
(003,004),
(003,005),
(002,006),
(002,007),
(002,008),
(002,009),
(001,010),
(001,011),
(001,012),
(001,013),
(001,014);

