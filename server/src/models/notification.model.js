import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['swap_request', 'swap_accepted', 'item_approved', 'points_update'] 
  },
  message: { 
    type: String, 
    required: true 
  },
  relatedItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);