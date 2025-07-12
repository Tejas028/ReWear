import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, // optimized searching
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    listedItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        }
    ],
    purchasedItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item',
        }
    ]

}, {timestamps: true})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);