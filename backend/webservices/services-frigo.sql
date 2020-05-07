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


ALTER PROCEDURE "DBA"."verifierUser"(@name varchar(30), @key varchar(20))
--Sebaztyan Schampaert
BEGIN
declare @msg varchar(30);
set @msg = 'smth';
call sa_set_http_header('Content-Type','text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*'); 
--creation de procedure et des headers appropries

--utilisation du exists pour verifier si le nom utilisateur est deja employe
    IF EXISTS (SELECT usrName FROM tbUsers WHERE usrName = name)
        THEN SELECT (@msg);
    ELSE
      BEGIN
        INSERT INTO DBA.tbUsers (usrID, usrName, usrKey)
         VALUES (DEFAULT, @name, @key);
        SELECT ('wew gj');
      END
    ENDIF;
END

CREATE SERVICE "verifierUser" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" METHODS 'GET' AS call DBA.verifierUser(:name, :key);





