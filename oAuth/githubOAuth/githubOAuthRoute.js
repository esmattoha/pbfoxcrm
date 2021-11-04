// import dependipencies
import express from "express";
import passport from "./githubOAuth.js";

const gitubOAuthRoute = express.Router();

gitubOAuthRoute.get("/github/oauth", (req, res, next)=>{
    res.send("<a href='/api/v2/oauth/github'>Sign In with Github</a>")
});

gitubOAuthRoute.get("/oauth/github", 
    passport.authenticate("github", { scope: [ 'user:email' ] })
);

gitubOAuthRoute.get('/oauth/github/callback', 
  passport.authenticate('github', { 
      failureRedirect: '/github/oauth',
      successRedirect : "/"
      
    }),
 );

// export 
export default gitubOAuthRoute ;