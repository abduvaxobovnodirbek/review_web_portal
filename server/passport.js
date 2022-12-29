const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_ID } = process.env;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User");

const GOOGLE_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";
const FACEBOOK_CALLBACK_URL =
  "http://localhost:5000/api/v1/auth/facebook/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        googleId: profile.id,
      };

      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return cb(null, existingUser);
        }
        const new_user = await User.create(defaultUser);
        return cb(null, new_user);
      } catch (error) {
        console.log("Error in authentication", error);
        cb(error, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      callbackURL: FACEBOOK_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
        facebookId: profile.id,
      };

      try {
        const existingUser = await User.findOne({ facebookId: profile.id });

        if (existingUser) {
          return cb(null, existingUser);
        }
        const new_user = await User.create(defaultUser);
        return cb(null, new_user);
      } catch (error) {
        console.log("Error in authentication", error);
        cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});
