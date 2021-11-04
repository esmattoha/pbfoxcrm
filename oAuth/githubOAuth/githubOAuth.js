// import dependencies
import env from "dotenv";
import passport from "passport";
import github_statergy from "passport-github2";
import User from "./../../user/userModel.js";

const GithubStatergy = github_statergy.Strategy;
env.config();

passport.use(
  new GithubStatergy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACKURL,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      const user = await User.findOne({name:profile.displayName, oAuth:{ github_id: profile.id}});
        if(!user){
          const createdUser = await User.create({
            name:profile.displayName,
            email: profile.name,
            password: profile.name,
            oAuth:{
                github_id : profile.id
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

//export
export default passport;
