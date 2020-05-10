CREATE PROCEDURE "DBA"."recupererUnite"()
RESULT (unitLib VARCHAR(10), unitID int)
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    SELECT unitLib, unitID
    FROM tbUnites
END

CREATE SERVICE "recupererUnite"
    TYPE 'JSON'
    AUTHORIZATION OFF 
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call DBA.recupererUnite()
