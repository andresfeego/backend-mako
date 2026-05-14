-- MAKO DB Migration Template
-- Date: 2026-05-13
-- Purpose: Normalize DB charset/collation to utf8mb4_uca1400_ai_ci
-- Usage: Replace __DB_NAME__ before running.

-- 1) Set default charset/collation at DB level
ALTER DATABASE `__DB_NAME__` CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;

-- 2) Generate required ALTER TABLE statements (copy/paste output and run it)
SELECT CONCAT(
  'ALTER TABLE `', TABLE_NAME,
  '` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci;'
) AS alter_stmt
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = '__DB_NAME__'
  AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;

-- 3) Post-checks
SELECT TABLE_COLLATION, COUNT(*) AS tables_count
FROM information_schema.TABLES
WHERE TABLE_SCHEMA='__DB_NAME__'
GROUP BY TABLE_COLLATION
ORDER BY tables_count DESC;

SELECT COLLATION_NAME, COUNT(*) AS cols_count
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA='__DB_NAME__'
  AND COLLATION_NAME IS NOT NULL
GROUP BY COLLATION_NAME
ORDER BY cols_count DESC;
