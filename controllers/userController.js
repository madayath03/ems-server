const users = require("../models/userSchema");

// register logic
exports.userRegister = async (req, res) => {
    // to get the image file
    const file = req.file.filename

    // destructuring
    const { fname, lname, email, mobile, gender, status, location } = req.body

    if (!fname || !lname || !email || !mobile || !gender || !status || !location || !file) {
        res.status(403).json("All inputs are required")
    }

    try {

        const user = await users.findOne({ email })

        if (user) {
            // user alredy there
            res.status(402).json("user already present")

        }
        else {
            //register this new user 
            // make user this is same as userschema format
            const newuser = new users({ fname, lname, email, mobile, gender, status, profile: file, location })

            await newuser.save()
            res.status(200).json(newuser)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.getallusers = async (req, res) => {
    // get query param from req
    const search = req.query.search
    const query = {
        // frst giv key to match and then options i means to make not case sensitive
        fname: { $regex: search, $options: "i" }
    }
    try {
        const userdata = await users.find(query)
        res.status(200).json(userdata)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.getuserdetail = async (req, res) => {
    const { id } = req.params
    try {
        const userdata = await users.findOne({ _id: id })
        if (userdata) {
            res.status(200).json(userdata)
        }
        else {
            res.status(404).json("User does not exist")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.editUser = async (req, res) => {
    const { id } = req.params

    // destructuring
    const { fname, lname, email, mobile, gender, status, location, user_profile } = req.body
    const file = req.file ? req.file.filename : user_profile

    try {
        const updatedUser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, status, profile: file, location
        }, {
            new: true
        })
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deluser = await users.findByIdAndDelete({ _id: id })
        res.status(200).json(deluser)
    }
    catch (error) {
        res.status(401).json(error)
    }
}