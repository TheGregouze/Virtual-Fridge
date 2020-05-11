CREATE PROCEDURE "DBA"."listUsers"()
RESULT (username char(30), pswd char(30))
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
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
