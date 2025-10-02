import mongoose, { Document, Schema } from "mongoose";

export interface ITreatmentShort extends Document {
  platform: "youtube" | "instagram";
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const treatmentShortsSchema = new Schema<ITreatmentShort>(
  {
    platform: {
      type: String,
      enum: ["youtube", "instagram"],
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (this: ITreatmentShort, url: string): boolean {
          if (this.platform === "youtube") {
            return (
              /^https?:\/\/(www\.)?youtube\.com\/shorts\/[A-Za-z0-9_-]+/.test(
                url
              ) || /^https?:\/\/youtu\.be\/[A-Za-z0-9_-]+/.test(url)
            );
          }
          if (this.platform === "instagram") {
            return /^https?:\/\/(www\.)?instagram\.com\/(reel|reels)\/[A-Za-z0-9_-]+/.test(
              url
            );
          }
          return false;
        },
        message: (props: { value: string }) =>
          `Invalid URL format for ${props.value}. Only valid YouTube Shorts or Instagram Reels URLs are allowed.`,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITreatmentShort>(
  "TreatmentShort",
  treatmentShortsSchema
);
