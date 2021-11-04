// import dependencies
import exppress from "express";
import passport from "./googleOAuth.js";

const googleOAuthRoute = exppress.Router();

googleOAuthRoute.get("/google/oauth", (req, res, next) => {
  res.send("<a href='/api/v2/oauth/google'> Sign In with Google</a>");
});

googleOAuthRoute.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleOAuthRoute.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/google/oauth",
    successRedirect: "/",
  })
);


// export 
export default googleOAuthRoute ;