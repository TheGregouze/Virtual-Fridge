CREATE PROCEDURE "DBA"."comparaisonRecettesFrigo"(@userID int)
RESULT(recetteID int, recetteLib varchar(30), instances int)
BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select tbRecettesProduits.rctID as rID, rctLib, count(prodID) as instances
    from tbRecettesProduits
    join tbRecettes on tbRecettesProduits.rctID = tbRecettes.rctID
    where tbRecettesProduits.prodID IN (SELECT tbFrigo.prodID FROM tbFrigo WHERE usrID = @userID)
    GROUP BY rID, rctLib
    ORDER BY instances DESC
END

CREATE SERVICE "comparaisonRecettesFrigo"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.comparaisonRecettesFrigo(:userID);
