const pool = require('./connection.js');

let csmDB = {};

function toMysqlDatetime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    const pad = (n) => String(n).padStart(2, '0');
    const yyyy = date.getUTCFullYear();
    const mm = pad(date.getUTCMonth() + 1);
    const dd = pad(date.getUTCDate());
    const hh = pad(date.getUTCHours());
    const mi = pad(date.getUTCMinutes());
    const ss = pad(date.getUTCSeconds());
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

csmDB.trackEvent = (event) => {

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO event_log (
                event_name, event_category, event_action, event_label, event_value,
                occurred_at, source_channel, platform, app_version, web_build,
                session_id, user_id, is_authenticated, request_id,
                page_url, referrer_url, screen_name,
                device_model, os_name, os_version, browser_name, browser_version,
                locale, timezone, country_code, city,
                ip_mode, ip_value, user_agent_raw, user_agent_hash,
                properties, schema_version
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `;
        const params = [
            event.event_name,
            event.event_category,
            event.event_action,
            event.event_label ?? null,
            event.event_value ?? null,
            toMysqlDatetime(event.occurred_at),
            event.source_channel,
            event.platform,
            event.app_version ?? null,
            event.web_build ?? null,
            event.session_id,
            event.user_id ?? null,
            event.is_authenticated ? 1 : 0,
            event.request_id,
            event.page_url ?? null,
            event.referrer_url ?? null,
            event.screen_name ?? null,
            event.device_model ?? null,
            event.os_name ?? null,
            event.os_version ?? null,
            event.browser_name ?? null,
            event.browser_version ?? null,
            event.locale ?? null,
            event.timezone ?? null,
            event.country_code,
            event.city ?? null,
            event.ip_mode,
            event.ip_value ?? null,
            event.user_agent_raw ?? null,
            event.user_agent_hash ?? null,
            JSON.stringify(event.properties ?? {}),
            event.schema_version,
        ];
        pool.query(sql, params, (err, results) => {

            if (err) {
                return reject(err);
            } else {
                return resolve(results)
            }
        });

    })

};


csmDB.busquedasPalabra = () => {

    return new Promise((resolve, reject) => {

        pool.query(`select e.event_label as etiqueta, COUNT(*) as count
                    from event_log as e
                    WHERE e.event_name = 'search_submitted'
                    group by e.event_label
                    `, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.flujosNavegacion = () => {

    return new Promise((resolve, reject) => {

        pool.query(`select
                        e.id,
                        e.event_action as flujo,
                        e.event_label as etiqueta,
                        e.session_id as hashSession,
                        e.is_authenticated as authenticated,
                        COALESCE(e.user_id, 0) as usuario,
                        COALESCE(e.device_model, 'NA') as dispositivo,
                        COALESCE(e.browser_name, 'NA') as navegador,
                        COALESCE(e.platform, 'NA') as plataforma,
                        e.country_code as pais,
                        e.occurred_at as fechaHora,
                        e.event_name,
                        e.event_category
                    from event_log as e
                    ORDER BY e.occurred_at DESC
                    `, [], (err, results) => {

            if (err) {
                return reject(err);
            } else {


                return resolve(results);
            }
        });

    })

};

csmDB.eventosPaginados = (limit, offset) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                id, event_name, event_category, event_action, event_label, event_value,
                occurred_at, source_channel, platform, app_version, web_build,
                session_id, user_id, is_authenticated, request_id,
                page_url, referrer_url, screen_name,
                device_model, os_name, os_version, browser_name, browser_version,
                locale, timezone, country_code, city,
                ip_mode, ip_value, user_agent_raw, user_agent_hash,
                properties, schema_version
             FROM event_log
             ORDER BY occurred_at DESC
             LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            }
        );
    });
};

csmDB.totalEventos = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(*) AS total FROM event_log`, [], (err, results) => {
            if (err) return reject(err);
            return resolve(results?.[0]?.total || 0);
        });
    });
};

csmDB.eventosPorSession = (sessionId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                id, event_name, event_category, event_action, event_label, event_value,
                occurred_at, source_channel, platform, app_version, web_build,
                session_id, user_id, is_authenticated, request_id,
                page_url, referrer_url, screen_name,
                device_model, os_name, os_version, browser_name, browser_version,
                locale, timezone, country_code, city,
                ip_mode, ip_value, user_agent_raw, user_agent_hash,
                properties, schema_version
             FROM event_log
             WHERE session_id = ?
             ORDER BY occurred_at ASC`,
            [sessionId],
            (err, results) => {
                if (err) return reject(err);
                return resolve(results);
            }
        );
    });
};



module.exports = csmDB;
