const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
//const { authMiddleware } = require("../middleware/userMiddleware"); // Asegúrate de que esta ruta es correcta
const authMiddleware = require('../../middleware/authMiddleware');
//const User = require("../models/User"); // Importa el modelo User
const User = require('../User');
//const Wallet = require("../models/Wallet"); // Importa el modelo Wallet si está en models
const Wallet = require('../Wallet');
//const { getUser, findPosition } = require('../../middleware/userMiddleware'); // Importa el middleware para obtener usuario
const { getUser, findPosition } = require("../../middleware/userMiddleware");

// Ruta para obtener todos los usuarios (solo para usuarios autenticados)
userRouter.get("/", authMiddleware, async (req, res) => {
  console.log("Ruta GET /users alcanzada"); // Verifica que la ruta se invoca
  try {
    const users = await User.find().populate("wallet"); // Población de billetera
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Ruta para crear un nuevo usuario
userRouter.post("/", async (req, res) => {
  const { idNumber, name, email, password, sponsorId } = req.body; // Incluye idNumber

  // Validaciones
  if (!idNumber || !name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Validar formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Formato de correo electrónico inválido" });
  }

  // Validar longitud de la contraseña
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    // Encontrar la posición correcta en la matriz
    const position = await findPosition(sponsorId);

    // Crear el nuevo usuario
    const newUser = new User({
      idNumber, // Número de identificación
      name,
      email,
      password, // La contraseña se encriptará más tarde
      sponsorId,
      front: position.front,
      level: position.level,
      position: position.position,
    });

    // Encriptar la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10); // Generar un salt
    newUser.password = await bcrypt.hash(newUser.password, salt); // Encriptar la contraseña

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Crear la billetera para el nuevo usuario
    const newWallet = new Wallet({ userId: newUser._id });
    await newWallet.save();

    // Asociar la billetera al usuario
    newUser.wallet = newWallet._id;
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Obtener todos los usuarios (solo para usuarios autenticados)
userRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().populate("wallet");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un usuario por ID (solo para usuarios autenticados)
userRouter.get("/:id", authMiddleware, getUser, (req, res) => {
  res.json(res.user);
});

// Actualizar un usuario por ID (solo para usuarios autenticados)
userRouter.patch("/:id", authMiddleware, getUser, async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body },
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un usuario por ID (solo para usuarios autenticados)
userRouter.delete("/:id", authMiddleware, getUser, async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Otros endpoints pueden añadirse aquí

module.exports = userRouter; // Exporta el router
