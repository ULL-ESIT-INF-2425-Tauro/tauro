import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, anonymous, bearer, jwt, openAPI } from 'better-auth/plugins';

import { ENVCONFIG } from '@/config.ts';
import { db } from '@/db.ts';

const ORIGIN_CORS = ENVCONFIG.ORIGIN_CORS;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),

  user: {
    changeEmail: {
      enabled: true, // allow users to change their email
      /*sendChangeEmailVerification: async ({ user, newEmail, url, token }, request) => {
                await sendEmail({
                    to: user.email, // verification email must be sent to the current user email to approve the change
                    subject: 'Approve email change',
                    text: `Click the link to approve the change: ${url}`
                }) 
            }*/
    },
    deleteUser: {
      enabled: true, // hard delete a user from your database
      /* sendDeleteAccountVerification: async (
                {
                    user,   // The user object
                    url, // The auto-generated URL for deletion
                    token  // The verification token  (can be used to generate custom URL)
                },
                request  // The original request object (optional)
            ) => {
                // Your email sending logic here
                // Example: sendEmail(data.user.email, "Verify Deletion", data.url);
            }, */
    },
  },
  emailAndPassword: {
    enabled: true,
    /*sendResetPassword: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: 'Reset your password',
                text: `Click the link to reset your password: ${url}`
            })
        } */
  },
  emailVerification: {
    /*sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendEmail({
     
             })
             
        },*/

    sendOnSignUp: true, // sends a verification email when a user signs up
    requireEmailVerification: true, // users must verify their email before they can log in
    autoSignInAfterVerification: true,
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 100, // max requests in the window
    storage: 'database',
    modelName: 'rateLimit',
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    freshAge: 60 * 60, // 1h
    cookieCache: {
      // stores session data in a short-lived, signed cookie like JWT
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  account: {
    accountLinking: {
      enabled: true, // enables users to associate multiple authentication methods with a single account
      allowDifferentEmails: true, // allow linking a social account with a different email address than the user
    },
  },
  socialProviders: {
    /* google: {
            clientId: 'YOUR_GOOGLE_CLIENT_ID',
            clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
        } */
  },
  trustedOrigins: [ORIGIN_CORS],
  advanced: {
    cookiePrefix: 'tauro',
    crossSubDomainCookies: {
      enabled: true,
      // domain: ".example.com", // Domain with a leading period
    },
    defaultCookieAttributes: {
      secure: true,
      httpOnly: true,
      sameSite: 'none', // Allows CORS-based cookie sharing across subdomains
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
    useSecureCookies: true,
  },

  plugins: [anonymous(), admin(), bearer(), jwt(), openAPI()],
});
