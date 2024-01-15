import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10) // 10 is number of rounds for hasing

    const newUser = new User({ username, email, password: hashedPassword });//to save the incoming data in the previously created model - "User"

    try {
        await newUser.save() //to save the data in database
        //saving user may take time depending upon speed of internet... await function stops the execution at this line until the step is completed successfully.
        res.status(201).json('User Created Succesfully')
    } catch (error) {
        res.status(500).json(error.message)
    }


}