import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['swap', 'points_purchase', 'admin_adjustment'], 
    required: true 
  },
  itemReceived: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  },
  itemGiven: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  },
  pointsChange: { 
    type: Number 
  },
  swapRequest: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SwapRequest' 
  }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);