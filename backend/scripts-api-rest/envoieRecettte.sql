ALTER PROCEDURE "DBA"."envoieRecette" (IN numeroRecette INTEGER)
BEGIN 
call sa_set_http_header('Content-Type', 'text/html');
call sa_set_http_header('Access-Control-Allow-Origin', '*');
select prodLib
FROM dba.tbRecettes as t1 
JOIN dba.tbRecettesProduits as t2
ON t1.rctID = t2.rctID
JOIN dba.tbProduits as t3
ON t2.prodID = t3.prodID
WHERE t1.rctID = numeroRecette
END
