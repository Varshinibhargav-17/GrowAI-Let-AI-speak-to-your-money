import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    gender: { type: String },
    financialProfileType: { type: String },
    incomePattern: { type: String },
    incomeNotes: { type: String },
    debt: { type: Object },
    financialFocus: { type: Object },
    career: { type: Object },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;

