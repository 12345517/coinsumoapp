const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true }, // Número de identificación
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  sponsorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  front: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  position: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  // Puedes agregar un campo para métodos de pago específicos si es necesario
  paymentMethods: {
    cash: { type: Boolean, default: true }, // Permitir pago en efectivo
    qrCode: { type: Boolean, default: true } // Permitir pago por QR
  },
  // ... otros campos del usuario
  membershipStatus: { type: String, default: 'inactive' }, // Estado de membresía (active, inactive, suspended)
  membershipExpiryDate: { type: Date } ,// Fecha de expiración de membresía
  // ... otros campos del usuario
  entrepreneur: { type: Boolean, default: false },  // Indica si es un empresario
  wholesale: { type: Boolean, default: false }, // Indica si es un mayorista
  collaborator: { type: Boolean, default: false } // Indica si es un colaborador
});

const User = mongoose.model('User', userSchema);

module.exports = User;