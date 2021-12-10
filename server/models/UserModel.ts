import mongoose from "mongoose";

type User = {
  username: string;
};
const UserScheme = new mongoose.Schema<User>({
  username: String,
});

const UserModel = mongoose.model<User>("User", UserScheme);
export default UserModel;
