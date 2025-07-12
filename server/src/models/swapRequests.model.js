import mongoose from "mongoose";

const swapRequestsSchema = new mongoose.Schema({
  requester: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  requestedItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },
  offeredItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  },
  offeredPoints: { 
    type: Number, 
    min: 0 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed'], 
    default: 'pending' 
  },
  message: { 
    type: String, 
    maxlength: 200 
  }
}, { timestamps: true });

export const SwapRequests = mongoose.model('SwapRequest', swapRequestsSchema);