import jwt from 'jsonwebtoken'
export const protectRoute = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({message: "Not authorized"})
        }
        req.user = user
        next()
    }
    catch (e) {
        console.log("error", e)
        res.status(401).json({message: "Not authorized"})
    }
}
