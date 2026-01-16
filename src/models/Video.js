import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        videoUrl: {
            type: String,
            required: [true, "Video URL is required"],
        },
        thumbnailUrl: {
            type: String,
            default: "",
        },
        controls: {
            type: Boolean,
            default: true,
        },
        transformation: {
            height: {
                type: Number,
                default: 1920,
            },
            width: {
                type: Number,
                default: 1080,
            },
            quality: {
                type: Number,
                default: 80,
                min: 1,
                max: 100,
            },
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


videoSchema.index({ createdAt: -1 });
videoSchema.index({ user: 1 });


const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

export default Video;
