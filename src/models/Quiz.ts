import mongoose, { Schema, Document } from "mongoose";

export interface IOption {
  text: string;
  isCorrect: boolean;
}

export interface IQuiz extends Document {
  category: "Hair" | "Skin";
  question: string;
  options: IOption[];
  type: "single" | "multiple";
}

const OptionSchema = new Schema<IOption>({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const QuizSchema = new Schema<IQuiz>(
  {
    category: { type: String, enum: ["Hair", "Skin"], required: true },
    question: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    type: { type: String, enum: ["single", "multiple"], default: "single" },
  },
  { timestamps: true }
);

export default mongoose.model<IQuiz>("Quiz", QuizSchema);
