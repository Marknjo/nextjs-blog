import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth-utils';
import { connectToDatabase } from '../../../lib/db-utils';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const userEmail = session.user.email;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  let client;

  try {
    client = await connectToDatabase();

    //find document
    const db = client.db();

    const usersCollection = db.collection('users');

    const foundUser = await usersCollection.findOne({ email: userEmail });

    if (!foundUser) {
      throw new Error('Provided user not found!');
    }

    //authenticate password
    const passwordMatch = await verifyPassword(oldPassword, foundUser.password);

    if (!passwordMatch) {
      throw new Error('Old password did not match');
    }

    //Update the new password
    const newHashedPassword = await hashPassword(newPassword);

    await usersCollection.updateOne(
      {
        email: userEmail,
      },
      {
        $set: { password: newHashedPassword },
      }
    );

    client.close();
    res.status(200).json({ message: 'Your password was updated successfully' });
  } catch (error) {
    client.close();
    res.status(422).json({ message: error.message });
    return;
  }
}

export default handler;
