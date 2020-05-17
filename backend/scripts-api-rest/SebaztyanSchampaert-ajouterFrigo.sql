CREATE PROCEDURE "DBA"."ajouterFrigo"(@produits int, @quantite int, @userID int)
BEGIN
    declare quant int;
    call sa_set_http_header('Access-Control-Allow-Origin', '*');   
    IF (testFrigo(@produit, @userID)= 'false') 
        THEN INSERT INTO tbFrigo(usrID, prodID,prodQuant) values (@userID, @produit, @quantite)
    ELSE 
        BEGIN
            set quant = (select prodQuant from tbFrigo WHERE usrID = @userId AND prodID = @produit);
            UPDATE tbFrigo SET prodQuant = @quantite + quant 
            WHERE usrID = @userId AND prodID = @produit; 
        END
    ENDIF;
END

CREATE SERVICE "ajouterFrigo"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.ajouterFrigo(:produits, :quantite, :userID)
