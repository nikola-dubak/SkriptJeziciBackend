const jwt = require("jsonwebtoken");
require("dotenv").config();

function authToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) return response.status(401).json({ msg: "Authorization is missing" });
    
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        request.user = user;
        next();
    } catch (error) {
        console.log(error);
        return response.status(403).json({ msg: error });
    }
}

module.exports = authToken;