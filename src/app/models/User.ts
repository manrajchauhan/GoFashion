import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    client_id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("validate", function (this: any, next: (err?: any) => void) {
  if (!this.client_id) {
    let randomId: number;
    let isUnique = false;

    const generateUniqueId = async () => {
      while (!isUnique) {
        randomId = Math.floor(Math.random() * (99999 - 20000 + 1)) + 20000;

        const existingUser = await mongoose.model("User").findOne({ client_id: randomId });
        if (!existingUser) {
          isUnique = true;
        }
      }

      this.client_id = randomId;
      next();
    };

    generateUniqueId().catch((err: any) => next(err));
  } else {
    next();
  }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
