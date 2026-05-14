# MAKO Event Catalog (Telemetry Dictionary)

Este archivo define el catálogo oficial de eventos para `POST /api/responseMako/bitacora/trackEvent`.

## Convenciones
- `event_name`: nombre técnico estable (snake_case).
- `event_category`: dominio funcional (`navigation`, `engagement`, `auth`, `commerce`, `ops`).
- `event_action`: acción específica del flujo (libre pero consistente).
- `event_label`: contexto puntual (ej: `codigoEmpresa`, `keyword`, `buttonId`).
- `properties`: JSON para metadatos extendidos.

## Catálogo base v1

## 1) `search_submitted`
- `event_category`: `navigation`
- `Descripción`: usuario ejecuta búsqueda.
- `event_action` esperado:
  - `Barra busqueda`
  - `Busqueda ciudad`
  - `Busqueda categoria`
- `event_label`:
  - keyword buscada o id de ciudad/categoría
- `properties` sugeridas:
  - `legacy_tipoAccion`
  - `legacy_flujo`
  - `legacy_etiqueta`
  - `filters` (si aplica)

## 2) `profile_viewed`
- `event_category`: `engagement`
- `Descripción`: usuario abre perfil de empresa.
- `event_action` esperado:
  - `Apertura local`
- `event_label`:
  - `codigoEmpresa`
- `properties` sugeridas:
  - `legacy_tipoAccion`
  - `origin` (`listado`, `busqueda`, `url_directa`)

## 3) `cta_clicked`
- `event_category`: `engagement`
- `Descripción`: clic en botón de acción.
- `event_action` esperado:
  - nombre de flujo/ubicación del botón (ej: `Menu principal`)
- `event_label`:
  - id/etiqueta del botón
- `properties` sugeridas:
  - `legacy_tipoAccion`
  - `button_type`
  - `ui_section`

## 4) `login_started`
- `event_category`: `auth`
- `Descripción`: inicio de intento de login.
- `event_action` esperado:
  - `login_mako`
  - `login_google`
  - `login_facebook`
- `event_label`:
  - `provider`
- `properties` sugeridas:
  - `source_screen`

## 5) `login_succeeded`
- `event_category`: `auth`
- `Descripción`: autenticación exitosa.
- `event_action` esperado:
  - `login_success`
- `event_label`:
  - `provider`
- `properties` sugeridas:
  - `user_role`

## 6) `login_failed`
- `event_category`: `auth`
- `Descripción`: autenticación fallida.
- `event_action` esperado:
  - `login_failed`
- `event_label`:
  - `provider`
- `properties` sugeridas:
  - `error_code`
  - `error_type`

## 7) `claim_started`
- `event_category`: `commerce`
- `Descripción`: comerciante inicia reclamo de negocio.
- `event_action` esperado:
  - `claim_start`
- `event_label`:
  - `codigoEmpresa`
- `properties` sugeridas:
  - `entrypoint`

## 8) `claim_submitted`
- `event_category`: `commerce`
- `Descripción`: reclamo enviado.
- `event_action` esperado:
  - `claim_submit`
- `event_label`:
  - `codigoEmpresa`
- `properties` sugeridas:
  - `documents_count`

## 9) `coupon_claimed`
- `event_category`: `commerce`
- `Descripción`: usuario reclama cupón/bono.
- `event_action` esperado:
  - `coupon_claim`
- `event_label`:
  - `couponId` o `bookletId`
- `properties` sugeridas:
  - `campaign_id`
  - `claim_channel`

## 10) `coupon_redeemed`
- `event_category`: `commerce`
- `Descripción`: cupón/bono redimido.
- `event_action` esperado:
  - `coupon_redeem`
- `event_label`:
  - `couponId`
- `properties` sugeridas:
  - `store_id`
  - `redeem_result`

## Campos comunes mínimos en todos los eventos
- `event_name`
- `event_category`
- `event_action`
- `occurred_at`
- `source_channel`
- `platform`
- `session_id`
- `request_id`
- `country_code`
- `ip_mode`
- `schema_version`

## Versionado del catálogo
- Versión inicial: `1.0.0`
- Regla: no renombrar `event_name` existente; para cambios incompatibles crear nuevo `event_name`.

