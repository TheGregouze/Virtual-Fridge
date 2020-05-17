CREATE FUNCTION "DBA"."testFrigo"(@produit int, @userID int)
RETURNS varchar(7)--retourne vrai si il y a deja une instance
BEGIN
    IF EXISTS (SELECT usrID FROM tbFrigo WHERE prodID = @produit AND usrID = @userID)
       THEN return ('true');
    ELSE
       return ('false');
    endif;
END


