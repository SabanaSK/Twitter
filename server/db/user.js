import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [ true, "Please provide a username!" ],
    unique: [ true, "Username Exist" ],
  },
  email: {
    type: String,
    required: [ true, "Please provide an Email!" ],
    unique: [ true, "Email Exist" ],
  },
  password: {
    type: String,
    required: [ true, "Please provide a password!" ],
    unique: false,
  },
  nickname: {
    type: String,
    unique: [ true, "Nickname Exist" ],
  }
});

UserSchema.pre("save", function (next)
{
  const nicknamePart1 = this.username.split(" ")[ 0 ];
  const nicknamePart2 = this.email.split("@")[ 0 ];
  this.nickname = `${ nicknamePart1 }@${ nicknamePart2 }`;
  next();
});

export default mongoose.model("Users", UserSchema);






// import mongoose from "mongoose";

// const UserSchema = mongoose.Schema({
//   username: {
//     type: String,
//     required: [ true, "Please provide a username!" ],
//     unique: [ true, "Username Exist" ],
//   },
//   email: {
//     type: String,
//     required: [ true, "Please provide an Email!" ],
//     unique: [ true, "Email Exist" ],
//   },
//   password: {
//     type: String,
//     required: [ true, "Please provide a password!" ],
//     unique: false,
//   },
//   nickname: {
//     type: String,
//     required: [ true, "Please provide a nickname!" ],
//     unique: [ true, "Nickname Exist" ],
//   },

// });

// export default mongoose.model("Users") || mongoose.model("Users", UserSchema);

