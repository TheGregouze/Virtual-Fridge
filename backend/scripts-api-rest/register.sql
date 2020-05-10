CREATE PROCEDURE "DBA"."register" (@username varchar(30), @password varchar(30))
RESULT (userID int)
BEGIN
    call sa_set_http_header( 'Content-Type', 'text/html' );
    INSERT INTO tbUsers values
    (DEFAULT, @username, @password);
    SELECT usrID 
    FROM tbUsers
    WHERE usrName = @username;
END

CREATE SERVICE "register"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.register(:username,:password);
