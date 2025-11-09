import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    financialProfileType: { type: String },
    incomePattern: { type: String },
    incomeNotes: { type: String },
    debt: { type: Object },
    financialFocus: { type: Object },
    career: { type: Object },
    selectedBanks: [{ type: String }],
    financialData: {
      profile: { type: Object },
      income: { type: Object },
      expenses: { type: Object },
      banks: { type: Object },
      summary: { type: Object },
      generated_at: { type: Date }
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;

