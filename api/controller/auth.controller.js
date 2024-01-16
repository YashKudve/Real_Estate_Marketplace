import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10) // 10 is number of rounds for hasing

    const newUser = new User({ username, email, password: hashedPassword });//to save the incoming data in the previously created model - "User"

    try {
        await newUser.save() //to save the data in database
        //saving user may take time depending upon speed of internet... await function stops the execution at this line until the step is completed successfully.
        res.status(201).json('User Created Succesfully')
    } catch (error) {
        next(error)

        //next(errorHandler(550, 'error from the function')) Manual error message
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Incorrect Credentials'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        const { password: pass, ...rest } = validUser._doc; //To hide password from being retrieved even if it is hashed.
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)

    } catch (error) {
        next(error) //index.js file contains middleware; this methods maps to middleware
    }
}