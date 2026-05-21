import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    duration:{
        type: Number,
        min: 1,
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    }
},{
    timestamps: true
});

export default mongoose.model("Study",studySchema);