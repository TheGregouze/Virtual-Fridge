CREATE procedure "dba"."resetFrigo" (@userID int)
BEGIN
     call sa_set_http_header('Access-Control-Allow-Origin', '*');
    DELETE FROM tbFrigo WHERE usrID = @userID;
END

CREATE SERVICE "resetFrigo"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.resetFrigo(:userID);
