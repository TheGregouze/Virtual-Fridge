CREATE PROCEDURE "DBA"."NombreProduit"()

BEGIN
	call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    
    SELECT count(*) as nbr
    FROM tbProduits
    
END


CREATE SERVICE "NombreProduit"
TYPE 'JSON'
AUTHORIZATION OFF 
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call DBA.NombreProduit()
