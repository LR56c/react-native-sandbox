import express from "express";
import cloudinary from "../cloudinary.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/", protectRoute, async (req, res) => {)
    try {
        const {title, author, description, image} = req.body;

        if (!title || !author || !description || !image) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const upload = await cloudinary.uploader.upload(image)
        const imageUrl = upload.secure_url

        const book = await Book.create({
            title,
            author,
            description,
            image: imageUrl,
            user: req.user._id
        });

        res.status(201).json(book);
    } catch (e) {
        console.log("error", e);
        res.status(500).json({message: "Server error"});
    }
});

router.get('/', protectRoute, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const books = await Book.find().sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .populate("user", "username profileImage")

        const totalBooks = await Book.countDocuments()
        res.status(200).json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        })
    } catch (e) {
        console.log("error", e);
        res.status(500).json({message: "Server error"});
    }
})

router.delete("/:id", protectRoute, async (req, res) => {)
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({message: "Book not found"})
        }

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Not authorized"})
        }

        if(book.image && book.image.includes("cloudinary")) {
            const publicId = book.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(publicId)
        }

        await book.deleteOne()
        res.status(200).json({message: "Book removed"})
    } catch (e) {
        console.log("error", e);
        res.status(500).json({message: "Server error"});
    }
})

router.get('/user', protectRoute, async (req, res) => {)
    try {
        const books = await Book.find({user: req.user._id}).sort({createdAt: -1})
        res.status(200).json(books)
    } catch (e) {
        console.log("error", e);
        res.status(500).json({message: "Server error"});
    }
})

export default router
