CREATE PROCEDURE "DBA"."recupererRecette" ()
RESULT (rctLib varchar(20),prodLib varchar(20),prodQuant int)
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    SELECT rctLib, prodLib, prodQuant
    FROM tbRecettesProduits
    NATURAL JOIN tbRecettes
    NATURAL JOIN tbProduits
END

CREATE SERVICE "recupererRecette"
TYPE 'JSON'
AUTHORIZATION OFF 
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call DBA.recupererRecette()
