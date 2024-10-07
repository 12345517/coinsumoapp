const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true }, // Número de identificación
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  whatsapp: { type: String }, // Añadir campo WhatsApp
  sponsorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  front: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  position: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  paymentMethods: {
    cash: { type: Boolean, default: true }, // Permitir pago en efectivo
    qrCode: { type: Boolean, default: true } // Permitir pago por QR
  },
  membershipStatus: { type: String, default: 'inactive' }, // Estado de membresía
  membershipExpiryDate: { type: Date },
  entrepreneur: { type: Boolean, default: false },  // Indica si es un empresario
  wholesale: { type: Boolean, default: false }, // Indica si es un mayorista
  collaborator: { type: Boolean, default: false } // Indica si es un colaborador
});

const User = mongoose.model('User', userSchema);

module.exports = User;
 