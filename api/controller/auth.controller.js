import User from '../models/user.model.js'

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });//to save the incoming data in the previously created model - "User"
    await newUser.save() //to save the data in database
    //saving user may take time depending upon speed of internet... await function stops the execution at this line until the step is completed successfully.
    res.status(201).json('User Created Succesfully')
}