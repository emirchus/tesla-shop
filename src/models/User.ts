import mongoose, { Schema, Model, model } from 'mongoose';
import { User } from '../interfaces';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: {
        values: ['client', 'admin', "super-user", "SEO"],
        message: 'enum validator failed for path `{PATH}` with value `{VALUE}`',
        default: 'client',
        required: true
      }
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({
  email: 'text'
});

const UserModel: Model<User> =
  mongoose.models.User || model('User', userSchema);

export default UserModel;
