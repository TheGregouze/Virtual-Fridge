CREATE PROCEDURE "DBA"."comparaisonRecettesFrigo"(@userID int)
RESULT(recette int, instances int)

BEGIN
    call sa_set_http_header('Content-Type','application:json; charset=utf-8');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    
    SELECT rctID, count(prodID) as instances
    FROM tbRecettesProduits
    WHERE tbRecettesProduits.prodID IN (SELECT tbFrigo.prodID FROM tbFrigo WHERE usrID = @userID) --on selectionne lorsque les ingredients requis se trouve dans le frigo de l'utilisateur
    GROUP BY rctID --regrouper par recettes, pour savoir combien de fois le frigo de l'utilisateur possède un ingrédient requis par la recette
    ORDER BY instances DESC --la recette la plus complète en premier
END

CREATE SERVICE "comparaisonRecettesFrigo"
    TYPE 'JSON'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.comparaisonRecettesFrigo(:userID);
