// Import Dependencies
import JWT from "jsonwebtoken";

const signedAccessToken = async (userId, email) => {
  return JWT.sign(
    {
      email: email,
      id: userId,
    },
    process.env.JWT_KEY,
    {
      expiresIn: process.env.JWT_ExpireIn,
    }
  );
};

// export
export default signedAccessToken ;