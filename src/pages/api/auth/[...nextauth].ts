import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'custom login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'my-email@email.com'
        },
        password: {
          label: 'Contraseña',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize(credentials, req) {
        const data = await  dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );

        return data;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2591000,
    strategy: 'jwt',
    updateAge: 86400
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.acessToken = account.access_token;
        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
          case 'oauth':
            token.user = await dbUsers.oAuthToUser(
              user?.email || '',
              user?.name || '',
              user?.image || ''
            );
            break;
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      session.acessToken = token.acessToken;
      session.user = token.user as any;
      return session;
    }
  }
});
