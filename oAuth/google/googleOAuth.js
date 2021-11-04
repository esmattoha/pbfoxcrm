// import dependencies
import env from "dotenv";
import passport from "passport";
import google_statergy from "passport-google-oauth";
import User from "./../../user/userModel.js";

const GoogleStatergy = google_statergy.OAuth2Strategy;
env.config();

passport.use(
  new GoogleStatergy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await User.findOne({email : profile.emails[0].value});
     if(!user){
       const createdUser = await User.create({
         email: profile.emails[0].value,
         name:profile.displayName,
         password: profile.displayName,
         oAuth:{
           google_id: profile.id
         }
       });
       if(!createdUser){
         return console.log(`Something went wrong.`)
       }
       return done(null, createdUser);
     }
     return done(null, user);
    }
  )
);

// export
export default passport;
