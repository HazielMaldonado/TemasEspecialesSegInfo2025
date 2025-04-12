const express = require('express');
const router = express.Router();
const User = require('../models/User');

// VULNERABLE LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }); // No se sanitiza: vulnerable

    if (user) {
      res.send('✅ Login exitoso');
    } else {
      res.status(401).send('❌ Credenciales incorrectas');
    }
  } catch (err) {
    res.status(500).send('❌ Error del servidor');
  }
});

module.exports = router;
