CREATE procedure "dba"."resetFrigo" (@userID int)
BEGIN
    DELETE FROM tbFrigo WHERE usrID = @userID;
END

CREATE SERVICE "resetFrigo"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.resetFrigo(:userID);
