// ────────────────────────────────────────────────────────────
//  Helper GPT  (CommonJS)                                     
//  Requiere Node ≥18 (fetch nativo).                          
// ────────────────────────────────────────────────────────────
const fetch = global.fetch || require('node-fetch');


const GPT = {};

// ── 1) Número siguiente (texto) ─────────────────────────────
GPT.consultarNumeroSiguiente = async (entrada) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente que recibe un número en texto, número o romano y responde en JSON el número siguiente. Ejemplo: 5 → {"siguiente":6}.',
        },
        { role: 'user', content: entrada },
      ],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Error API GPT');
  return JSON.parse(data.choices[0].message.content); // ← ya JSON limpio
};

// ── 2) Datos de tarjeta / volante (visión) ──────────────────
GPT.extraerDatosTarjeta = async (base64Images = []) => {
  if (!base64Images.length) throw new Error('No hay imágenes');

  const imageBlocks = base64Images.slice(0, 2).map((b64) => ({
    type: 'image_url',
    image_url: { url: `data:image/jpeg;base64,${b64}` },
  }));

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o', // visión + buen precio
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente que recibe una o más imágenes de tarjetas o volantes de comercios. Extrae la información de contacto visible y devuélvela en un JSON con esta estructura: nombre, slogan, palabras_clave (array de strings), direccion (sin incluir ciudad), ciudad, Departamento, telefonos (array telefonos () direfenciando si es celular o fijo campo tipo fijo/cel). Si no hay algún dato, deja el campo vacío. Ademas analiza estas imagenesde de tarjeta o volante comercial. ¿Dónde se encuentra visualmente el logo del negocio? Devuélveme las coordenadas normalizadas en porcentaje de ancho y alto de la imagen: x, y, width, height',
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extrae los datos y la posición del logo.' },
            ...imageBlocks,
          ],
        },
      ],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Error API GPT');
  return JSON.parse(data.choices[0].message.content);
};

module.exports = GPT;
