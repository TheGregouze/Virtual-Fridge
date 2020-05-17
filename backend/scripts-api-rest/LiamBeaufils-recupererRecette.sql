CREATE PROCEDURE "DBA"."recupererRecette" ()
RESULT (rctLib varchar(20),prodLib varchar(20),prodQuant int)
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
     call sa_set_http_header('Access-Control-Allow-Origin', '*');
    SELECT rctLib, prodLib, prodQuant
    FROM tbRecettesProduits
    JOIN tbRecettes on tbRecettesProduits.rctID = tbRecettes.rctID
    JOIN tbProduits on tbRecettesProduits.prodID = tbProduits.prodID
END

CREATE SERVICE "recupererRecette"
TYPE 'JSON'
AUTHORIZATION OFF 
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call DBA.recupererRecette()
