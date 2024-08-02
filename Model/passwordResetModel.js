const { Schema, model } = require("mongoose");
const PasswordResetSchema = new Schema({
  userId: {
    type: String,
  },
  resetString: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});
module.exports = model("passwordReset", PasswordResetSchema);
