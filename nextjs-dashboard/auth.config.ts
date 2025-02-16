import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("Auth User : ", auth?.user)
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    session: async ({session, user}) => {
      if (session.user) {
        session.user.id = "test";
        session.user.role = "admin";
      }
      console.log("Session: ", session)
      console.log("User: ", user)
      return session;
    },
    
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;