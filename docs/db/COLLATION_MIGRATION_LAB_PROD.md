# Collation Migration Runbook (LAB / PROD)

## Objetivo
Unificar base de datos a:
- Charset: `utf8mb4`
- Collation: `utf8mb4_uca1400_ai_ci`

Esto evita errores tipo:
- `ER_CANT_AGGREGATE_2COLLATIONS`

## Prerrequisitos
- Backup verificado.
- Backend usando sesión utf8mb4 en conexión.

## Paso 1: Backup
```bash
MYSQL_PWD='<ROOT_PASS>' mysqldump --column-statistics=0 -h <HOST> -P <PORT> -u root <DB_NAME> > <DB_NAME>_pre_utf8mb4.sql
```

## Paso 2: Alter DB
```sql
ALTER DATABASE `<DB_NAME>` CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;
```

## Paso 3: Alter tablas
```sql
SELECT CONCAT(
  'ALTER TABLE `', TABLE_NAME,
  '` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;'
) AS alter_stmt
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = '<DB_NAME>'
  AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;
```

## Paso 4: Reiniciar backend
Reiniciar servicio para abrir nuevas conexiones con collation de sesión correcta.

## Paso 5: Validación
```sql
SELECT TABLE_COLLATION, COUNT(*) AS tables_count
FROM information_schema.TABLES
WHERE TABLE_SCHEMA='<DB_NAME>'
GROUP BY TABLE_COLLATION
ORDER BY tables_count DESC;

SELECT COLLATION_NAME, COUNT(*) AS cols_count
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA='<DB_NAME>'
  AND COLLATION_NAME IS NOT NULL
GROUP BY COLLATION_NAME
ORDER BY cols_count DESC;
```

Smoke API:
```bash
curl -i http://<BACKEND_HOST>:<BACKEND_PORT>/health
curl -i http://<BACKEND_HOST>:<BACKEND_PORT>/api/responseMako/usuario/listarUsuarios
```

## Rollback
```bash
MYSQL_PWD='<ROOT_PASS>' mysql -h <HOST> -P <PORT> -u root <DB_NAME> < <BACKUP_FILE>.sql
```

## Checklist
- [ ] Backup listo
- [ ] DB alterada
- [ ] Tablas convertidas
- [ ] Backend reiniciado
- [ ] Auditoría collation OK
- [ ] Smoke API OK
