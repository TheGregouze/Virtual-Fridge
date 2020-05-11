CREATE PROCEDURE "DBA"."getProduits"()
RESULT (id int, lib varchar(20), libUnit varchar(10))
BEGIN
     call sa_set_http_header('Access-Control-Allow-Origin', '*');
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
