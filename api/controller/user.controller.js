import User from "../models/user.model.js";
import { errorHandler } from "../utils/error";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({
        message: "Hello Folks"
    })
}

export const updateUser = (req, res, next) => {
    if (req, user, id !== req.params.id) return next(errorHandler(401, "Unauthorized!"))

    try {
        if (req, body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = new User.findByIdAndUpdate(req.params.id,)
    } catch (error) {
        next(error)
    }
}