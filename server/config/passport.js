import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/users.js";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refeshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });

      if (!user) {
        const newUser = await User.create({
          userName: profile.name.givenName,
          email: profile.emails[0].value,
          googleId: profile.id,
          password: Date.now(),
        });

        return done(null, newUser);
      }

      return done(null, user);
    }
  )
);
