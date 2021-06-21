import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth-utils';
import { connectToDatabase } from '../../../lib/db-utils';

export default NextAuth({
  session: {
    jwt: true,
  },
  // pages: {
  //   signIn: '/auth',
  // },
  providers: [
    Providers.Credentials({
      async authorize(credentials, req) {
        const client = await connectToDatabase();

        const db = client.db();

        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('User or password is wrong!');
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error('User or password is wrong!');
        }

        client.close();

        return {
          email: user.email,
        };
      },
    }),
  ],
});
