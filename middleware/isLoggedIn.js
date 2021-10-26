//Import Dependencies
import User from '../user/userModel.js';
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import extractToken from "../utils/extractToken.js";
import validateToken from "../utils/validateToken.js";

 
//Middleware to check authticity of user
const isLoggedIn = catchAsync(async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).send({ message: "Unauthorized Request1" });
  }

  const userId = await validateToken(token);

  if (!userId) {
    return res.status(401).send({ message: "Unauthorized Request2" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(
      new AppError(`Account not exist or the account is terminated.`, 204)
    );
  }
  req.user = user;
  next();
});

//export 
export default isLoggedIn ;
