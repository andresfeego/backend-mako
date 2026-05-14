-- Normaliza coordenadas repetidas en empresa a (0,0)
-- Regla solicitada: cualquier par lat/lng repetido (COUNT > 1) pasa a 0,0

START TRANSACTION;

UPDATE empresa e
JOIN (
  SELECT lat, lng
  FROM empresa
  WHERE lat IS NOT NULL
    AND lng IS NOT NULL
  GROUP BY lat, lng
  HAVING COUNT(*) > 1
) d ON e.lat = d.lat AND e.lng = d.lng
SET e.lat = 0,
    e.lng = 0;

COMMIT;
