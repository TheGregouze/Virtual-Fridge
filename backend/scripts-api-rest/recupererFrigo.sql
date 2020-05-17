CREATE PROCEDURE "DBA"."recupererFrigo"(@userID int)
RESULT (lib varchar(16), quant int, libUnit varchar(10))
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
     call sa_set_http_header('Access-Control-Allow-Origin', '*');
    SELECT prodLib, prodQuant, unitLib
    FROM tbFrigo
    JOIN tbProduits ON tbFrigo.prodID = tbProduits.prodID
    JOIN tbUnites ON tbProduits.unitID = tbUnites.unitID
    WHERE usrID = @userID;
END

CREATE SERVICE "recupererFrigo"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.recupererFrigo(:userID)
