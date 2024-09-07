SELECT c.pk_clienteid, c.razaosocial, c.telefone
FROM cliente c
JOIN telefone t ON c.pk_clienteid = t.fk_clienteid
JOIN estado e ON c.fk_estadoid = e.estadoid
WHERE e.nmestado = 'SP';