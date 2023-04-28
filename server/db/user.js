import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: [true, "Username Exist"],
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  nickname: {
    type: String,
    unique: [true, "Nickname Exist"],
  },
  img: {
    type: String,
    unique: false,
  },
  about: {
    type: String,
    unique: false,
  },
  employment: {
    type: String,
    unique: false,
  },
  city: {
    type: String,
    unique: false
  },
  web: {
    type: String,
    unique: false,
  },
  followers: {
    type: Array, default: []
  },
  following: {
    type: Array, default: []
  },
  registerDate: {
    type: Date,
    default: Date.now,
  }
});

UserSchema.pre("save", function (next) {
  const nicknamePart1 = this.username.split(" ")[0];
  const nicknamePart2 = this.email.split("@")[0];
  this.nickname = `${nicknamePart1}@${nicknamePart2}`;
  next();
});

export default mongoose.models.Users || mongoose.model("Users", UserSchema);

