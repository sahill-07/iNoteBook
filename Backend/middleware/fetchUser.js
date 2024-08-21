const jwt = require('jsonwebtoken');

const JWT_SECRECT = "SahilToken"

const fetchUser = (req , res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Access Denied"})
    }
    try {
        const data = jwt.verify(token , JWT_SECRECT);
        req.user = data.user
        next();
    } catch (error) {
        console.log('error : ' , error.message );
        res.status(500).json({ msg: "Some error occured" }); 
    }
}

module.exports = fetchUser ;