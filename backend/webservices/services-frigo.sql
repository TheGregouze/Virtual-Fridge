CREATE PROCEDURE dba.getProduits()
RESULT (lib char(30))
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    select prodLib
    from dba.tbProduits
END;
-------
CREATE SERVICE "getProduits"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.getProduits();