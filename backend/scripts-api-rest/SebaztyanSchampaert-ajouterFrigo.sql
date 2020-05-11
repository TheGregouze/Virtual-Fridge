CREATE PROCEDURE "DBA"."ajouterFrigo"(@produits int, @quantite int, @userID int)
--Sebaztyan Schampaert
BEGIN
    declare quant int;
    call sa_set_http_header('Access-Control-Allow-Origin', '*');   

    IF (testFrigo(@produits, @userID)= 'false') --test si la combinaison userId et prodId est deja present dans le frigo
        THEN INSERT INTO tbFrigo(usrID, prodID,prodQuant) values (@userID, @produits, @quantite)--si non, on ajoute normalement
    ELSE 
        BEGIN
            --si oui, on sauvegarde la quantitee precedente et on met a jour le resultat 
            set quant = (select prodQuant from tbFrigo WHERE usrID = @userId AND prodID = @produits);
            UPDATE tbFrigo SET usrID = @userID, prodID = @produits, prodQuant = @quantite + quant 
            WHERE usrID = @userId AND prodID = @produits;
        END
    endif;
END

CREATE SERVICE "ajouterFrigo"
    TYPE 'RAW'
    AUTHORIZATION OFF
    USER "DBA"
    URL ON
    METHODS 'GET'
AS call dba.ajouterFrigo(:produits, :quantite, :userID)
