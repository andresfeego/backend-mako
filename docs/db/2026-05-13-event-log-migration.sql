-- MAKO telemetry migration
-- Creates event_log canonical table and backfills from legacy bitacora

CREATE TABLE IF NOT EXISTS event_log (
  id BIGINT NOT NULL AUTO_INCREMENT,
  event_name VARCHAR(80) NOT NULL,
  event_category VARCHAR(80) NOT NULL,
  event_action VARCHAR(120) NOT NULL,
  event_label VARCHAR(255) DEFAULT NULL,
  event_value DOUBLE DEFAULT NULL,
  occurred_at DATETIME NOT NULL,
  source_channel VARCHAR(20) NOT NULL,
  platform VARCHAR(30) NOT NULL,
  app_version VARCHAR(40) DEFAULT NULL,
  web_build VARCHAR(80) DEFAULT NULL,
  session_id VARCHAR(100) NOT NULL,
  user_id INT DEFAULT NULL,
  is_authenticated TINYINT(1) NOT NULL DEFAULT 0,
  request_id VARCHAR(100) NOT NULL,
  page_url VARCHAR(500) DEFAULT NULL,
  referrer_url VARCHAR(500) DEFAULT NULL,
  screen_name VARCHAR(150) DEFAULT NULL,
  device_model VARCHAR(150) DEFAULT NULL,
  os_name VARCHAR(80) DEFAULT NULL,
  os_version VARCHAR(80) DEFAULT NULL,
  browser_name VARCHAR(80) DEFAULT NULL,
  browser_version VARCHAR(80) DEFAULT NULL,
  locale VARCHAR(30) DEFAULT NULL,
  timezone VARCHAR(100) DEFAULT NULL,
  country_code VARCHAR(8) NOT NULL,
  city VARCHAR(120) DEFAULT NULL,
  ip_mode VARCHAR(20) NOT NULL,
  ip_value VARCHAR(255) DEFAULT NULL,
  user_agent_raw VARCHAR(600) DEFAULT NULL,
  user_agent_hash VARCHAR(128) DEFAULT NULL,
  properties JSON DEFAULT NULL,
  schema_version VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_event_log_occurred_at (occurred_at),
  KEY idx_event_log_source_time (source_channel, occurred_at),
  KEY idx_event_log_name_time (event_name, occurred_at),
  KEY idx_event_log_user_time (user_id, occurred_at),
  KEY idx_event_log_session_time (session_id, occurred_at),
  KEY idx_event_log_request_id (request_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO event_log (
  event_name, event_category, event_action, event_label, event_value,
  occurred_at, source_channel, platform, app_version, web_build,
  session_id, user_id, is_authenticated, request_id,
  page_url, referrer_url, screen_name,
  device_model, os_name, os_version, browser_name, browser_version,
  locale, timezone, country_code, city,
  ip_mode, ip_value, user_agent_raw, user_agent_hash,
  properties, schema_version
)
SELECT
  CASE b.tipoAccion
    WHEN 1 THEN 'search_submitted'
    WHEN 2 THEN 'profile_viewed'
    WHEN 3 THEN 'app_opened'
    WHEN 4 THEN 'cta_clicked'
    WHEN 5 THEN 'screen_viewed'
    ELSE 'legacy_event'
  END AS event_name,
  CASE b.tipoAccion
    WHEN 1 THEN 'navigation'
    WHEN 2 THEN 'engagement'
    WHEN 3 THEN 'engagement'
    WHEN 4 THEN 'engagement'
    WHEN 5 THEN 'navigation'
    ELSE 'ops'
  END AS event_category,
  b.flujo AS event_action,
  b.etiqueta AS event_label,
  NULL AS event_value,
  b.fechaHora AS occurred_at,
  CASE b.navegador
    WHEN 2 THEN 'web'
    ELSE 'app'
  END AS source_channel,
  CASE b.plataforma
    WHEN 2 THEN 'web_desktop'
    WHEN 1 THEN 'web_mobile'
    ELSE 'unknown'
  END AS platform,
  NULL AS app_version,
  NULL AS web_build,
  b.hashSession AS session_id,
  CASE WHEN b.usuario = 0 THEN NULL ELSE b.usuario END AS user_id,
  b.authenticated AS is_authenticated,
  CONCAT('legacy-', b.id) AS request_id,
  NULL AS page_url,
  NULL AS referrer_url,
  NULL AS screen_name,
  b.dispositivo AS device_model,
  NULL AS os_name,
  NULL AS os_version,
  CAST(b.navegador AS CHAR) AS browser_name,
  NULL AS browser_version,
  NULL AS locale,
  NULL AS timezone,
  b.pais AS country_code,
  NULL AS city,
  'raw' AS ip_mode,
  NULL AS ip_value,
  NULL AS user_agent_raw,
  NULL AS user_agent_hash,
  JSON_OBJECT(
    'legacy_id', b.id,
    'legacy_tipoAccion', b.tipoAccion,
    'legacy_flujo', b.flujo,
    'legacy_etiqueta', b.etiqueta,
    'legacy_hashSession', b.hashSession,
    'legacy_navegador', b.navegador,
    'legacy_plataforma', b.plataforma
  ) AS properties,
  '1.0.0' AS schema_version
FROM bitacora b
WHERE NOT EXISTS (
  SELECT 1 FROM event_log e WHERE e.request_id = CONCAT('legacy-', b.id)
);
