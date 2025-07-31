/* eslint-disable @typescript-eslint/no-explicit-any */
import bcryptjs from "bcryptjs";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { IsActive, Role, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { envVars } from "./env";

// Local Strategy for email/password login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const user: (IUser & any) | null = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User does not exist" });
        }

        if (!user.isVerified) {
          return done(null, false, { message: "User is not verified" });
        }

        if (user.isActive === IsActive.BLOCKED || user.isActive === IsActive.SUSPENDED) {
          return done(null, false, { message: `User is ${user.isActive}` });
        }

        if (user.isDeleted) {
          return done(null, false, { message: "User is deleted" });
        }

        // Make sure auths is an array before checking
        const isGoogleAuthenticated =
          Array.isArray(user.auths) && user.auths.some((p: any) => p.provider === "google");

        if (isGoogleAuthenticated && !user.password) {
          return done(null, false, {
            message:
              "You have authenticated through Google. To login with credentials, first login with Google, set a password, then login with email and password.",
          });
        }

        const isPasswordMatched = await bcryptjs.compare(password, user.password || "");

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password does not match" });
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0].value;

        if (!email) {
          return done(null, false, { message: "No email found" });
        }

        let user: (IUser & any) | null = await User.findOne({ email });

        if (user) {
          if (!user.isVerified) {
            return done(null, false, { message: "User is not verified" });
          }

          if (user.isActive === IsActive.BLOCKED || user.isActive === IsActive.SUSPENDED) {
            return done(null, false, { message: `User is ${user.isActive}` });
          }

          if (user.isDeleted) {
            return done(null, false, { message: "User is deleted" });
          }
        } else {
          // User doesn't exist — create new user
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google Strategy Error", error);
        return done(error);
      }
    }
  )
);

// Serialize user by MongoDB _id to session
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

// Deserialize user from session by _id
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

export default passport;
