CREATE PROCEDURE "DBA"."getUserID"(@username varchar(30))
RESULT (userID int)
BEGIN
    call sa_set_http_header( 'Content-Type', 'text/html' );
     call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select usrID
    FROM tbUsers
    WHERE usrName = @username;
END

CREATE SERVICE "getUserID"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.getUserID(:username);
