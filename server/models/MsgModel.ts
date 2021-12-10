import mongoose from "mongoose";

type Msg = {
  msgAuthor: string;
  msgText: string;
  msgTime: string;
};
const MsgScheme = new mongoose.Schema<Msg>({
  msgAuthor: String,
  msgText: String,
  msgTime: Date,
});

const MsgModel = mongoose.model<Msg>("Msg", MsgScheme);
export default MsgModel;
