ALTER PROCEDURE "DBA"."getProduits"()
RESULT (id int, lib varchar(20), libUnit varchar(10))
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    SELECT prodID, prodLib, unitLib
    FROM tbProduits 
    NATURAL JOIN tbUnites
END

CREATE SERVICE "getProduits"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.getProduits();


ALTER PROCEDURE "DBA"."listUsers"()
RESULT (username char(30), pswd char(30))
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    select usrName, usrKey
    from dba.tbUsers
END

CREATE SERVICE "listUsers"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.listUsers();


CREATE PROCEDURE "DBA"."getUserID"(@username varchar(30))
RESULT (userID int)
BEGIN
    call sa_set_http_header( 'Content-Type', 'text/html' );
    select usrID
    FROM tbUsers
    WHERE usrName = @username;
END

CREATE SERVICE "getUserID"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.getUserID(:username);







ALTER PROCEDURE "DBA"."ajouterFrigo"(@produits int, @quantite int, @userID int)
BEGIN
    call sa_set_http_header('Access-Control-Allow-Origin', '*');   
    INSERT INTO tbFrigo (usrID, prodID,prodQuant) values
    (@userID, @produits, @quantite);
END

CREATE SERVICE "ajouterFrigo"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.ajouterFrigo(:produits, :quantite, :userID)

------------------------------------------
-- Procedure liam beaufils

ALTER PROCEDURE "DBA"."affichageAlliments" ()
BEGIN 
 call sa_set_http_header('Content-Type', 'text/html');
 call sa_set_http_header('Access-Control-Allow-Origin', '*');
select prodLib 
FROM DBA.tbProduits;
END

ALTER PROCEDURE "DBA"."envoieRecette" (IN numeroRecette INTEGER)
BEGIN 
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
select prodLib
FROM dba.tbRecettes as t1 
JOIN dba.tbRecettesProduits as t2
ON t1.rctID = t2.rctID
JOIN dba.tbProduits as t3
ON t2.prodID = t3.prodID
WHERE t1.rctID = numeroRecette
END

ALTER PROCEDURE "DBA"."sendRecette" (IN produit VARCHAR(20))
BEGIN
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
SELECT rctLib, t1.rctID
FROM DBA.tbRecettes as t1
JOIN Dba.tbRecettesProduits as t2
ON t1.rctID = t2.rctID
JOIN dba.tbProduits as t3
ON t2.prodID = t3.prodID
WHERE t3.prodLib = produit
END


------------------------------
ALTER PROCEDURE "DBA"."listProd"()
RESULT (numID int, lib varchar(16), unite varchar(16))
BEGIN
    call sa¨_set_http_header('Content-Type','application:json; charset=utf-8');
    SELECT prodID, prodLib, unitLib
    FROM tbProduits 
    NATURAL JOIN tbUnites
END

CREATE SERVICE "listProd"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.getUserID()

ALTER PROCEDURE "DBA"."verifierUser"(in @name varchar(30), in @key varchar(20))
--Sebaztyan Schampaert
RESULT(str varchar(30))
BEGIN
declare @msg varchar(30);
set @msg = 'smth';
call sa_set_http_header('Content-Type','text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*'); 
--creation de procedure et des headers appropries

--utilisation du exists pour verifier si le nom utilisateur est deja employe
    IF EXISTS (SELECT usrName FROM tbUsers WHERE usrName = @name)
        THEN SELECT (@msg);
    ELSE
      BEGIN
        INSERT INTO DBA.tbUsers (usrID, usrName, usrKey)
         VALUES (DEFAULT, @name, @key);
        SELECT ('wew gj');
      END
    endif;
END


CREATE SERVICE "verifierUser" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS call DBA.verifierUser(:name, :key);
