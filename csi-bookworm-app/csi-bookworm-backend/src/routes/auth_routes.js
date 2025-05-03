import express from 'express'
import {User} from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router()

const generateToken = (userId)=> jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

router.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body

        if (!email || !username || !password) {
            return res.status(400).json({message: "Please fill all the fields"})
        }

        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }
        if (username.length < 3) {
            return res.status(400).json({message: "Username must be at least 3 characters"})
        }
        const userEmail = await User.findOne({email})
        if (userEmail) {
            return res.status(400).json({message: "User already exists"})
        }
        const userName = await User.findOne({username})
        if (userName) {
            return res.status(400).json({message: "Username already exists"})
        }
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

        const user = await User({
            email,
            username,
            password,
            profileImage
        })

        await user.save()
        const token = generateToken(user._id)
        res.status(201).json({
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        })
    } catch (e) {
        console.log('error', e)
        res.status(500).json({message: "Server error"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"})
        }

        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await user.matchPassword(password)
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = generateToken(user._id)
        res.status(200).json({
            token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        })
    } catch (e) {
        console.log('error', e)
        res.status(500).json({message: "Server error"})
    }
})

export default router
