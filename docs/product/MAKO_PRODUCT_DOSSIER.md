# MAKO — Product Architecture & MVP Definition

> Documento maestro del producto Mako.  
> Consolida visión, flujos, funcionalidades, monetización, confianza, visibilidad y principios del sistema sin perder el contexto estratégico del proyecto.

---

# 1. Visión del producto

Mako busca convertirse en **la plataforma digital de presencia comercial para negocios locales**, construyendo una **base de datos viva de empresas** que crece continuamente mediante la participación de usuarios, comerciantes, editores y herramientas automatizadas.

El sistema combina **descubrimiento de empresas, colaboración de usuarios, adquisición automática de negocios, verificación avanzada y herramientas comerciales**, permitiendo que cualquier persona pueda encontrar comercios confiables y tomar decisiones informadas antes de realizar una compra o contratar un servicio.

A diferencia de muchos directorios o redes sociales donde la información puede ser incompleta o manipulada, Mako busca convertirse en **el directorio formal y confiable para evaluar comercios locales**, priorizando:

- transparencia
- trazabilidad de la información
- veracidad de los datos
- evolución real de la reputación de los negocios

La plataforma permitirá que las empresas evolucionen desde registros básicos dentro del directorio hacia perfiles administrados por comerciantes con herramientas de presencia digital, visibilidad y conversión.

De esta manera Mako aspira a convertirse en **la fuente más confiable para decidir si realizar o no negocios con un comercio local**.

---

# 2. Problema del mercado

Actualmente muchos negocios locales:

- no tienen presencia digital organizada
- dependen exclusivamente de redes sociales
- son difíciles de encontrar en buscadores
- no tienen herramientas para gestionar su visibilidad local
- no cuentan con una reputación estructurada y verificable

Para los usuarios también existe un problema:

- es difícil descubrir negocios locales confiables
- la información suele estar dispersa
- muchos negocios no tienen presencia online estructurada
- las reseñas pueden ser manipuladas o eliminadas
- no existe suficiente trazabilidad frente a conflictos entre clientes y comercios

Mako busca resolver este problema creando **un directorio estructurado que conecte usuarios y comercios locales**, donde la confianza y la visibilidad sean parte central del producto.

---

# 3. Concepto de Mako

Mako funciona como un **directorio colaborativo de empresas** que puede crecer incluso cuando los comercios aún no se han registrado.

Las empresas pueden existir inicialmente como **empresas tipo 0** dentro del sistema.

Posteriormente pueden evolucionar a perfiles administrados por comerciantes mediante el proceso de **reclamación de propiedad** y escalar dentro del sistema de planes.

El sistema combina:

- descubrimiento de empresas
- colaboración de usuarios
- adquisición automática de empresas
- monetización mediante planes
- reputación auditada
- certificación progresiva
- herramientas comerciales para negocios

Mako no es solo un directorio. Es una infraestructura de confianza comercial local.

---

# 4. Ecosistema del sistema

El ecosistema de Mako se compone de cuatro dominios principales.

## Web

La web pública funciona como **motor de descubrimiento de empresas optimizado para SEO**.

Permite:

- búsqueda por ciudad
- búsqueda por categoría
- búsqueda por palabra clave
- visualización de perfiles de empresa
- páginas indexables para planes que participan en SEO

## Aplicación

La aplicación complementa la web permitiendo:

- encontrar empresas
- guardar contactos
- generar nuevas empresas tipo 0
- usar listas y directorios personales
- consumir promociones, bonos o beneficios del sistema

## Solara

Solara es el **panel administrativo del sistema**.

Desde Solara se gestionan:

- empresas
- usuarios
- scraping
- validaciones
- permisos
- flujos de verificación
- calidad del dato
- enrolamiento de empresas a planes

## Inteligencia Artificial

La IA puede asistir funciones como:

- reconocimiento de imágenes
- OCR para tarjetas o volantes
- enriquecimiento automático de datos
- clasificación de empresas
- búsquedas inteligentes
- apoyo a validación y control de calidad

---

# 5. Tipos de usuario

## Usuario

Persona que utiliza el sistema para descubrir empresas.

Puede:

- buscar empresas
- guardar números
- contribuir a crear empresas tipo 0
- consultar reputación y certificación
- usar promociones o bonos

## Empresario

Comerciante que administra su negocio dentro del sistema.

Puede:

- reclamar su empresa
- editar información
- adquirir planes
- crear promociones y bonos según plan
- mejorar su presencia digital y posicionamiento

## Editor

Usuario con permisos especiales para ayudar en la **verificación y mejora de empresas dentro del directorio**.

Este rol funciona como puente entre el crecimiento automático del sistema y la validación humana.

Puede:

- verificar información de empresas
- mejorar perfiles de empresas tipo 0
- ayudar a completar datos faltantes
- apoyar procesos de reclamación de empresas
- ayudar a enrolar empresas en los diferentes planes

Este rol es clave para mantener la **calidad del directorio mientras el sistema crece**.

## Administrador

Usuarios con acceso completo a Solara.

Pueden:

- validar empresas
- mejorar información
- gestionar scraping
- administrar usuarios y roles
- supervisar el trabajo de editores
- definir reglas de operación del sistema

---

# 6. Flujos principales del sistema

## Descubrimiento

El usuario busca empresas mediante filtros, categorías, ciudad o palabra clave.

## Guardar número

El usuario guarda un número que no existe en el sistema.

Si la empresa no existe:

→ se genera **empresa tipo 0** automáticamente.

## Reclamar empresa

El comerciante encuentra su negocio, inicia sesión si es necesario y reclama la propiedad.

## Adquirir plan

Una empresa puede evolucionar desde perfil básico a perfiles con herramientas avanzadas.

---

# 7. Generación de empresas

El directorio puede crecer mediante múltiples fuentes.

## Scraping

Importación automatizada de empresas desde fuentes públicas.

Incluye:

- scraping de datos básicos
- obtención de url de logos cuando sea posible
- enriquecimiento progresivo posterior

## Usuarios

Cuando un usuario guarda un número que no existe en el sistema.

## Registro directo

Un comerciante puede crear su empresa manualmente.

## Convenios

Integración futura con cámaras de comercio u organizaciones.

## Flujo de generación desde usuarios

Usuario guarda un número → el sistema verifica si existe → si no existe se crea **empresa tipo 0** → Solara valida la información → la empresa pasa al directorio público.

---

# 8. Catálogo de funcionalidades

## Experiencia del usuario

### Funciones básicas

- registro de usuario
- ver mi directorio
- agregar número a mi directorio
- ver lista offline
- interfaz amigable tipo directorio telefónico

### Funciones deseables

- descuentos por ciudad
- cupones intercambiables
- números de emergencia por ciudad
- directorio colaborativo

### Mejoras futuras

- filtros sobre mapas
- integraciones externas tipo referencias de presencia

## Sistema de adquisición de empresas

El crecimiento del directorio depende de múltiples mecanismos que permiten generar empresas incluso cuando los comerciantes no se han registrado.

### Métodos básicos

- scraping de empresas incluyendo obtención automática de logos cuando sea posible
- infraestructura de comunicación (correo, SMS y WhatsApp) para contactar comercios

### Fuentes de adquisición

1. scraping automatizado
2. creación manual desde Solara
3. generación desde la aplicación mediante Mi Directorio
4. registro directo de comerciantes

## Flujo del comerciante

El flujo general para comerciantes dentro del sistema es el siguiente:

1. registro gratuito en la plataforma
2. reclamar propiedad de empresa existente
3. editar empresa tipo 0
4. adquirir plan tipo 1
5. editar empresa tipo 1 con herramientas avanzadas

Este flujo permite convertir empresas básicas del directorio en perfiles administrados por comerciantes.

## Sistema de planes (Plan Ladder)

Mako utiliza un sistema de planes progresivo que define las capacidades del perfil del comercio dentro del directorio.

Los planes están alineados con los tipos de empresa:

Tipo 0 → Plan Base  
Tipo 1 → Plan Plus  
Tipo 2 → Plan Pro  
Tipo 3 → Plan Business

Los planes definen herramientas, edición y visibilidad.

La certificación (verificado, confiable, etc.) es independiente de los planes.

### Matriz de funcionalidades

| Funcionalidad | Base (T0) | Plus (T1) | Pro (T2) | Business (T3) |
|------|------|------|------|------|
| Perfil básico visible | ✅ | ✅ | ✅ | ✅ |
| Reclamar perfil | ✅ | ✅ | ✅ | ✅ |
| Editar datos críticos | ✅ (si reclamado) | ✅ | ✅ | ✅ |
| Editar todo el perfil | ❌ | ✅ | ✅ | ✅ |
| Logo | ❌ | ✅ | ✅ | ✅ |
| Fotos | ❌ | Feed (0–25) | Feed + galerías | Feed + galerías |
| Álbumes / galerías | ❌ | ❌ | ✅ | ✅ |
| Teléfonos | 1 | 3 | ilimitados | ilimitados |
| Categorías | 1 | 2 | 5 | ilimitadas |
| Checklist de completitud | ✅ | ✅ | ✅ | ✅ |
| Botón contacto (call/WA) | ✅ | ✅ | ✅ | ✅ |
| Analítica básica | ✅ | ✅ | ✅ | ✅ |
| Analítica avanzada | ❌ | ⚠️ básica+ | ✅ | ✅ |
| Posts informativos | ❌ | ✅ | ✅ | ✅ |
| Promociones (texto) | ❌ | ✅ | ✅ | ✅ |
| Promociones (sistema) | ❌ | ❌ | ✅ | ✅ |
| Formulario / leads | ❌ | ❌ | ✅ | ✅ |
| FAQs / contenido estructurado | ❌ | ❌ | ✅ | ✅ |
| Servicios | ❌ | Badge / palabra clave | Completo | Completo |
| Roles / permisos | ❌ | ❌ | ⚠️ básico | ✅ |
| Soporte prioritario | ❌ | ❌ | ❌ | ✅ |
| Destacado (Top N) | ❌ | ❌ | ❌ | ✅ |
| Bonos / talonarios | ❌ | ❌ | ✅ | ✅ |
| Optimización buscadores web (SEO) | ❌ | Baja | Media | Alta |
| Posicionamiento en buscadores IA | ❌ | Baja | Media | Alta |

### Reglas del sistema de planes

- El Plan Base (Tipo 0) permite presencia mínima en el directorio.
- Los planes superiores aumentan:
  - control del perfil
  - capacidad de contenido
  - herramientas de conversión
  - visibilidad

- Los planes no garantizan reputación ni confianza.
- La confianza se define por el sistema de certificación.

### Sistema de destacado (Plan Business)

- Se define un Top N por ciudad y categoría.
- Puede operar mediante rotación (recomendado) o asignación fija.
- Requiere:
  - perfil completo
  - categoría correcta
  - sin reportes graves

- El destacado:
  - debe estar claramente etiquetado
  - no garantiza ventas
  - garantiza exposición bajo reglas definidas

### Uso típico por plan

- Base (T0) → “quiero existir en el directorio”  
- Plus (T1) → “quiero un perfil completo y bien presentado”  
- Pro (T2) → “quiero organizarme y convertir más”  
- Business (T3) → “quiero dominar mi categoría en mi ciudad”

### Sistema de visibilidad y descubrimiento (Web + IA)

Este sistema define cómo los perfiles participan en buscadores web e IA según el plan.

#### Plan Base (Tipo 0)

- Modo: **Modal (no página independiente)**
- No genera URL indexable
- No incluye:
  - meta title
  - meta description
  - keywords
  - schema markup
- No indexado por Google
- Baja probabilidad de aparecer en IA

#### Plan Plus (Tipo 1)

- Modo: **Página independiente básica**
- URL única indexable
- title básico (nombre + categoría + ciudad)
- meta description básica
- indexación en buscadores
- estructura SEO simple

#### Plan Pro (Tipo 2)

- Modo: **Página optimizada SEO**
- title optimizado
- meta description editable
- headings estructurados (H1, H2)
- contenido enriquecido (servicios, FAQs)
- imágenes indexables
- schema markup básico

#### Plan Business (Tipo 3)

- Modo: **Página full SEO + IA ready**
- todo lo de Pro +
- múltiples keywords / categorías
- contenido estructurado avanzado
- schema completo (LocalBusiness, FAQ, Product)
- optimización semántica
- datos estructurados para IA

#### Reglas del sistema de visibilidad

- Solo perfiles con **página independiente** participan en SEO
- Los perfiles en modo modal (Tipo 0) **no son indexables**
- La mejora de plan incrementa progresivamente:
  - indexabilidad
  - calidad del contenido
  - estructura de datos
  - probabilidad de aparición en buscadores e IA

### Sistema de bonos y promociones

Los talonarios de bonos permiten a los comercios crear promociones redimibles dentro del sistema.

#### Principio clave

Todos los bonos deben estar **asociados a un usuario** para garantizar trazabilidad, control y analítica.

#### Modelo por talonario (obligatorio)

Tanto los bonos públicos como privados se gestionan mediante **talonarios con cantidad limitada**.

- Cada talonario define: tipo de bono, cantidad total, fechas y reglas.
- Cada bono es una **instancia única** dentro del talonario.

#### Tipos de talonario

**Talonario público**
- visible para usuarios
- los usuarios pueden **reclamar** bonos disponibles
- al reclamar, el bono queda asignado al usuario

**Talonario privado**
- no visible públicamente
- el comercio distribuye acceso mediante:
  - código
  - link privado
  - QR
- el usuario debe reclamar el bono para asignarlo a su cuenta

> A nivel del sistema, ambos funcionan igual; la diferencia es el **método de distribución**.

#### Estructura del sistema

- **Talonario**
  - cantidad total de bonos
  - tipo (descuento, 2x1, etc.)
  - fecha de inicio y expiración
  - reglas (límite por usuario, etc.)

- **Bono individual**
  - ID único
  - usuario asignado
  - estado
  - referencia al talonario

#### Tipos de bonos

- descuento (% o valor fijo)
- 2x1
- paga X lleva X
- combos
- promociones por tiempo limitado
- promociones por stock limitado
- beneficios por primera compra
- bonos de fidelidad (ej: compra 5 → 1 gratis)

#### Flujo de uso

Comercio crea talonario  
↓  
Usuario accede (público o privado)  
↓  
Usuario reclama bono  
↓  
Bono se asigna a su cuenta  
↓  
Usuario lo presenta en tienda  
↓  
Comercio valida  
↓  
Bono pasa a estado: canjeado

#### Estados del bono

- activo
- reservado
- canjeado
- expirado
- cancelado

#### Reglas del sistema

- todos los bonos deben estar asociados a un usuario
- los talonarios tienen cantidad limitada de bonos
- cada bono es único y trazable
- los bonos deben reclamarse antes de ser redimidos
- el sistema debe registrar:
  - usuario
  - fecha de asignación
  - estado
  - comercio emisor
  - origen (público o privado)

#### Características del sistema

- asignación por QR, link o código
- control de redención en tienda
- historial de uso
- límite de uso por usuario (configurable)
- expiración automática
- validación manual o asistida

#### Diferenciación del sistema de contenido

- Post informativo → comunicación
- Promoción → intención comercial
- Bono → acción medible y redimible

## Herramientas para comerciantes

### Funciones deseables

- estadísticas detalladas de visitas
- botón de feedback hacia Mako
- sistema de puntuación ponderada
- videos o ayudas explicativas dentro del perfil

### Mejoras futuras

- funciones específicas por categoría de negocio (ejemplo: menú para restaurantes)

## Funciones administrativas (Solara)

- lista de locales registrados por asesor
- verificación de barrios creados por usuarios
- verificación de logos subidos por empresas
- visualización completa de tarjetas en flujos administrativos
- listado de empresas ordenadas por número de vistas
- marcar empresas tipo 0 como favoritas para procesos de mejora de datos
- integración con herramientas de scraping para enriquecer perfiles
- selector automático o sugerido de logos para empresas

## Inteligencia artificial

### Funciones deseables

- guardar tarjeta o volante mediante reconocimiento de imagen (OCR)

### Mejoras futuras

- búsqueda de productos mediante fotografía
- búsqueda inteligente de empresas mediante IA

## Fortalezas del sistema

- plataforma de amplio espectro capaz de centralizar información comercial
- crecimiento del directorio mediante múltiples mecanismos automáticos
- integración entre web, aplicación y sistema administrativo

## Amenazas del proyecto

- aparición de competidores con soluciones similares
- necesidad de validar rápidamente el modelo con usuarios reales
- importancia de lanzar una herramienta funcional antes que otras alternativas en el mercado

---

# 9. MVP

Las funcionalidades clasificadas como **B (Básicas)** forman parte del MVP.

Incluyen principalmente:

- registro de usuario
- generación de empresas tipo 0
- reclamación de empresas
- edición básica de empresa
- visualización del directorio
- sistema base de perfiles
- funcionamiento del Plan Base (Tipo 0)

---

# 10. Expansión

Las funcionalidades marcadas como **⭐ (bueno tener)** corresponden a mejoras posteriores al MVP.

Ejemplos:

- cupones
- descuentos
- estadísticas avanzadas
- feedback
- mejoras de experiencia y conversión comercial

---

# 11. Futuro

Las funcionalidades marcadas como **📈** corresponden a evolución estratégica del producto.

Ejemplos:

- búsqueda de empresas mediante inteligencia artificial
- reconocimiento de imágenes
- funciones específicas por categoría

## Sistema de confianza y verificación

Uno de los pilares futuros del sistema es construir un **modelo de confianza robusto para usuarios y empresas**, inspirado en sistemas de verificación utilizados en fintech y plataformas de alto nivel de seguridad.

Mako busca convertirse en el **directorio más confiable para decidir si realizar o no negocios con una empresa**.

Para lograrlo se contempla un sistema de verificación progresiva de empresas.

### Estados de certificación (insignias del comercio)

Los comercios dentro de Mako podrán mostrar **insignias visibles en su perfil** que reflejan su nivel de verificación y confianza.

#### 1. Sin verificar

• El comercio existe en el directorio (tipo 0 o creado por registro, scraping o usuarios).  
• La información puede estar incompleta o no validada.

#### 2. Verificado

• Superó una verificación básica definida por Mako.  
• Ejemplos de validación:
  - confirmación de teléfono
  - confirmación de contacto
  - validación básica de ubicación

#### 3. Confiable

• Superó una verificación intermedia con mayor evidencia o señales de legitimidad.  
• Debe reflejar mayor confianza pública que el estado “Verificado”.  
• Puede requerir señales como:
  - número mínimo de reseñas
  - interacción real de usuarios con el comercio
  - actividad comprobable dentro del sistema

#### 4. Certificado

• Nivel más alto de verificación dentro de Mako.  
• Incluye validación avanzada que puede involucrar:
  - verificación documental
  - validación empresarial
  - auditoría por parte del equipo de Mako

• Para alcanzar este nivel el comercio debe cumplir condiciones como:
  - reputación positiva sostenida
  - calificación ponderada mínima
  - historial de interacción verificable

### Reglas operativas del sistema de certificación

• Los **estados de certificación son independientes de los planes comerciales**.

Esto significa que un comercio puede:

- pagar únicamente el proceso de verificación
- mejorar su estado de confianza sin cambiar de plan

• Los planes comerciales pueden incluir beneficios relacionados con certificación, por ejemplo:

- verificación básica incluida (estado “Verificado”)
- descuentos o créditos para subir a “Confiable” o “Certificado”

### Sistema de reputación transparente

A diferencia de muchas redes sociales, los comentarios negativos **no podrán ser eliminados por las empresas**.

Cuando un usuario reporte un problema:

1. el comentario permanece visible
2. el comercio puede responder
3. ambas partes pueden aportar pruebas
4. el historial queda visible para otros usuarios

Si ninguna de las partes responde o existe conflicto prolongado, **Mako puede actuar como auditor neutral** revisando la información presentada.

### Protección contra reseñas falsas

El sistema podrá evaluar múltiples señales para detectar comportamientos sospechosos:

- edad de la cuenta
- historial de reseñas
- comportamiento del usuario
- patrones de actividad

### Calificación ponderada por tiempo

Las calificaciones de los negocios no se basarán únicamente en promedios simples.

Mako implementará **calificaciones ponderadas por tiempo**, donde las reseñas recientes tendrán mayor peso que las antiguas.

Esto permite que negocios que mejoran con el tiempo puedan reflejar esa evolución en su reputación.

---

# 12. Arquitectura conceptual

El ecosistema de Mako puede entenderse en cinco bloques principales:

1. **Usuario**
   - descubre empresas
   - guarda contactos
   - contribuye a la creación de empresas tipo 0

2. **Empresario**
   - reclama empresas
   - administra perfiles
   - adquiere planes

3. **Adquisición de empresas**
   - scraping
   - registros
   - generación desde usuarios

4. **Solara**
   - panel administrativo
   - validación de información
   - gestión de datos

5. **Inteligencia artificial**
   - reconocimiento de imágenes
   - búsquedas inteligentes
   - automatización de enriquecimiento de datos

---

# 13. Analítica

El sistema puede recopilar información sobre visitas a empresas.

Ejemplos:

- número de visitas
- origen de la visita
- dispositivo
- ubicación aproximada
- clicks a contacto
- interacción con promociones
- redención de bonos

Estos datos pueden utilizarse para:

- ordenar empresas por popularidad
- generar estadísticas
- mejorar posicionamiento dentro del directorio
- medir confianza y conversión comercial

### Métricas orientadas a confianza

Las métricas del sistema no deben centrarse únicamente en visitas.

También deben medirse indicadores como:

- porcentaje de perfiles reclamados
- porcentaje de empresas verificadas
- tiempo promedio de verificación
- conversión a planes según estado de certificación
- retención de comercios
- churn y causas de salida

---

# 14. Riesgos

- aparición de competidores con soluciones similares
- necesidad de validar el modelo rápidamente
- dependencia inicial de adquisición de empresas
- fraude en reseñas
- perfiles con información incompleta o falsa
- abuso de beneficios promocionales si no se controla correctamente

---

# 15. Consejos para construir un backlog eficiente

A partir de este documento se recomienda estructurar el backlog mediante **épicas funcionales**.

Ejemplo:

EPIC 1 — Descubrimiento de empresas

- búsqueda
- filtros

EPIC 2 — Gestión de empresas

- reclamar empresa
- editar perfil

EPIC 3 — Usuarios

- registro
- autenticación

EPIC 4 — Comerciantes

- planes
- herramientas comerciales

EPIC 5 — Solara

- validación
- enriquecimiento de datos

EPIC 6 — Crecimiento del directorio

- scraping
- directorio colaborativo

Esta estructura permite construir backlog en tres niveles:

EPIC → STORY → TASK

---

# 16. Principios de marketing y producto

Los siguientes principios guían la construcción del producto y la comunicación del valor de Mako como **directorio confiable para decisiones comerciales**.

## 1. Vender confianza como producto

La confianza no es solo un mensaje de marketing, sino una característica estructural del sistema.

- Cada insignia o estado debe tener reglas claras.
- Debe ser posible explicar qué proceso tuvo que pasar un comercio para obtenerla.
- Evitar insignias sin sustento verificable.

Para cada estado se deben definir:

- requisitos
- evidencias
- excepciones

## 2. Separación entre certificación y plan

En Mako se separan dos conceptos:

**Estado de certificación** → nivel de confianza del comercio.

**Plan comercial** → herramientas, visibilidad y funcionalidades para el negocio.

Esto permite:

- vender procesos de verificación sin requerir suscripción
- ofrecer planes a comercios que ya confían en la plataforma

## 3. Progresión simple de certificación

El sistema utiliza una progresión clara de cuatro niveles:

Sin verificar → Verificado → Confiable → Certificado

La interfaz debe mostrar siempre **qué falta para subir al siguiente nivel**.

## 4. Transparencia radical en reputación

Las reseñas negativas no se eliminan automáticamente.

El comercio puede responder y aportar evidencia, generando un historial visible para otros usuarios.

Esto debe considerarse tanto una funcionalidad del sistema como una política del producto.

## 5. Prueba de trabajo y trazabilidad

Todo cambio importante en el sistema debe registrar:

- quién realizó el cambio (usuario, editor o administrador)
- cuándo se realizó
- qué información fue modificada

Esto fortalece la confianza del sistema y reduce disputas.

## 6. Entrada fácil, verificación rigurosa

La creación inicial de empresas debe tener baja fricción (empresa tipo 0).

Los niveles superiores de certificación incrementan progresivamente el rigor del proceso.

Esto permite:

- crecimiento rápido del directorio
- mantenimiento de calidad en los niveles altos

## 7. Diseñar para el momento de intención

Existen tres momentos clave dentro del sistema:

1. Usuario descubre un negocio y necesita confiar.
2. Comercio encuentra su perfil y quiere controlarlo.
3. Editor o administrador valida información.

El producto debe optimizar cada uno de estos momentos.

## 8. Definición clara de empresa dentro del sistema

Para evitar ambigüedad se definen diferentes estados de empresa:

- empresa tipo 0
- empresa reclamada
- empresa verificada
- empresa confiable
- empresa certificada

Opcionalmente también puede existir:

- empresa desactivada
- empresa reportada
- empresa no recomendada

## 9. Métricas orientadas a confianza + conversión B2B

Las métricas del sistema no deben centrarse únicamente en visitas.

También deben medirse indicadores como:

- porcentaje de perfiles reclamados
- porcentaje de empresas verificadas
- tiempo promedio de verificación
- conversión a planes según estado de certificación
- retención de comercios

## 10. Solara como panel administrativo

Para usuarios y comercios el producto es simplemente **Mako**.

Solara se documenta internamente como **panel administrativo de Mako**.

Esto evita confusión de marca.

## 11. Estrategia de planes recomendados

La estructura de planes puede utilizar un modelo de anclaje de valor:

- un plan medio recomendado
- un plan superior que ancla el valor percibido

El plan recomendado debe ofrecer la mejor relación entre costo y beneficios.

## 12. Lenguaje consistente

La comunicación del producto debe evitar promesas absolutas.

Se recomienda utilizar términos como:

- verificado
- evidencia
- historial
- trazabilidad
- validación

Este lenguaje refuerza el posicionamiento de Mako como **directorio confiable y verificable**.

---

# 17. Sesgos psicológicos útiles para el ladder

> Estos principios deben usarse para **facilitar decisiones**, no para manipular ni engañar.

## 1. Efecto ancla (Anchoring)

- **Qué es:** la primera referencia de precio o valor condiciona la percepción de los demás planes.
- **Cómo usarlo en Mako:** presentar Business como referencia máxima y Pro como el punto ideal para la mayoría.
- **Uso en producto:** Business sirve como marco de comparación para que Pro se perciba razonable.
- **Ejemplo:** “Business es para dominar ciudad/categoría con cupos. Para la mayoría, Pro es el punto ideal.”

## 2. Efecto señuelo (Decoy)

- **Qué es:** un plan intermedio puede hacer que otro se vea claramente mejor.
- **Cómo usarlo en Mako:** Plus debe ser bueno, pero Pro debe tener un diferencial estructural claro.
- **Regla:** el señuelo no debe ser malo, solo menos conveniente frente a Pro.
- **Ejemplo:** álbumes/galerías + organización + conversión hacen que Pro tenga más sentido para negocios activos.

## 3. Aversión a la pérdida (Loss aversion)

- **Qué es:** las personas reaccionan más ante perder oportunidades que ante ganar beneficios abstractos.
- **Cómo usarlo en Mako:** comunicar qué deja de pasar si el perfil es incompleto.
- **Regla:** usar mensajes ligados a comportamientos reales, no a exageraciones.
- **Ejemplo:** “Si tu perfil no tiene fotos (Base), más usuarios abandonan sin contactarte.”

## 4. Prueba social (Social proof)

- **Qué es:** las personas confían más cuando ven que otros ya usan o valoran algo.
- **Cómo usarlo en Mako:** mostrar métricas reales agregadas o tendencias sostenibles.
- **Regla:** solo usar prueba social si puede sustentarse con datos.
- **Ejemplo:** “Los perfiles con fotos (Plus) suelen recibir más contactos que los perfiles sin imágenes.”

## 5. Autoridad (Authority)

- **Qué es:** confiamos más en una fuente percibida como experta o recomendada.
- **Cómo usarlo en Mako:** marcar Pro como recomendado, explicando claramente por qué.
- **Regla:** la autoridad debe justificarse con una ventaja funcional real.
- **Ejemplo:** “Pro (recomendado) porque te deja organizar fotos por servicios y facilitar la decisión del cliente.”

## 6. Simplicidad / Paradoja de elección

- **Qué es:** demasiadas opciones frenan la decisión.
- **Cómo usarlo en Mako:** mantener cuatro planes máximo y explicar para quién sirve cada uno.
- **Regla:** resaltar tres diferenciales por plan, no listas interminables.
- **Ejemplo:** Base para existir, Plus para verse bien, Pro para convertir, Business para dominar.

## 7. Sesgo de presente (Present bias)

- **Qué es:** las personas valoran más los beneficios inmediatos.
- **Cómo usarlo en Mako:** explicar qué se activa hoy con cada upgrade.
- **Ejemplo:** “Plus: subes logo y 25 fotos hoy; mañana ya te ven más completo.”

## 8. Efecto de dotación (Endowment)

- **Qué es:** valoramos más aquello que sentimos como nuestro.
- **Cómo usarlo en Mako:** el acto de reclamar el perfil crea sentido de propiedad.
- **Ejemplo:** “Reclama tu perfil: desde ahí lo controlas tú.”

## 9. Escasez (Scarcity) con reglas claras

- **Qué es:** lo limitado se percibe como más valioso.
- **Cómo usarlo en Mako:** aplicar escasez real solo en Business, mediante Top N por ciudad/categoría.
- **Regla:** debe haber cupos reales, transparencia y criterios visibles.
- **Ejemplo:** “Business: cupos limitados en Top N de tu ciudad/categoría.”

## 10. Compromiso y consistencia

- **Qué es:** cuando alguien da un primer paso, tiende a continuar en la misma dirección.
- **Cómo usarlo en Mako:** Base → reclamar → completar datos → Plus → Pro.
- **Ejemplo:** “Ya reclamaste tu perfil; el siguiente paso lógico es mostrar tu catálogo con fotos.”

## 11. Efecto progreso

- **Qué es:** las personas quieren completar lo que ya empezaron.
- **Cómo usarlo en Mako:** checklist de perfil, barra de progreso y mensajes tipo “te falta 1 paso para subir de nivel”.

## 12. Claridad vs incertidumbre

- **Qué es:** las personas prefieren opciones claras sobre opciones ambiguas.
- **Cómo usarlo en Mako:** definir exactamente qué incluye cada plan y evitar promesas vagas.
- **Ejemplo:** mejor decir “aparece en Top N de tu ciudad” que “tendrás más visibilidad”.

## Aplicación rápida al ladder

- **Base:** reclamar + completar lo crítico (dotación + compromiso)
- **Plus:** foto e imagen profesional ya (presente + prueba social)
- **Pro:** organizar por servicios para convertir (autoridad + sencillez)
- **Business:** Top N con cupos (escasez + claridad)

