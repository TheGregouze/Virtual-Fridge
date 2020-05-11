CREATE FUNCTION "DBA"."testFrigo"(@produits int, @userID int)
RETURNS varchar(7)--retourne vrai si il y a deja une instance
BEGIN
    IF EXISTS (SELECT usrID FROM tbFrigo WHERE prodID = @produits AND usrID = @userID)
       THEN return ('true');
    ELSE
       return ('false');
    endif;
END


