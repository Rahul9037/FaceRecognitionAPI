const handleSignIn = (req, res , db , bcrypt) => {
    const { email, password } = req.body;
    if( !email || !password)
    {
        return res.status(400).json('All entries required')
    }
    db('login')
            .select('hash')
            .where({ email })
            .then(hash => {
                const isValid = bcrypt.compareSync(password , hash[0].hash);
                if(isValid)
                {
                    db('users')
                    .select('*')
                    .where({email})
                    .then( user => res.json(user[0]))
                    .catch( err => res.status(400).json('User Not Found!!!'))
                }
                else
                {
                    res.status(400).json('User Credential Incorrect!!!')
                }
            })
            .catch( err => res.status(400).json('User Not Found!!!')) 
}

module.exports ={
    handleSignIn : handleSignIn
}