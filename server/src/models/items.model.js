import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    decription: {
        type: String,
    },
    swapStatus: {
      type: String,
      enum: ['available', 'pending', 'swapped', 'removed'],
      default: 'available',
    },
    points :{
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // Admin must approve listings
    },
     quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1'],
    },
}, {timestamps: true})

export const Item = mongoose.model('Item', itemSchema);