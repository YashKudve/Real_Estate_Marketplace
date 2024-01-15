import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

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

        //next(errorHandler(550, 'error from the function')) MAnual error message
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Incorrect Credentials'));

    } catch (error) {
        next(error) //indes.js file contains middleware
    }
}