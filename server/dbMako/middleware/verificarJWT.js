const jwt = require('jsonwebtoken');
const { serialize } = require('cookie');

function verificarJWT(req, res, next) {
  const isProd = process.env.NODE_ENV === 'production';
  const token = req.cookies?.makoSession;

  if (!token) {
    const deleteCookie = serialize('makoSession', '', {
      httpOnly: true,
      path: '/',
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      maxAge: 0,
    });

    res.setHeader('Set-Cookie', deleteCookie);
    return res.status(200).json({ active: false, reason: 'no-session' }); // 🔁
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const deleteCookie = serialize('makoSession', '', {
      httpOnly: true,
      path: '/',
      sameSite: isProd ? 'none' : 'lax',
     secure: isProd,
      maxAge: 0,
    });

    res.setHeader('Set-Cookie', deleteCookie);
    console.error('[verificarJWT] ❌ Token inválido:', err.message);
    return res.status(200).json({ active: false, reason: 'invalid-session' }); // 🔁
  }
}

module.exports = verificarJWT;
