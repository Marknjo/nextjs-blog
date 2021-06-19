import { hashedPassword } from '../../../lib/auth-utils';
import { connectToDatabase } from '../../../lib/db-utils';

async function handler(req, res) {
  const { email, password } = req.body;

  //validation
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    db.close();

    res.status(422).json({
      message: 'Invalid inputs - your password or email is invalid! Try again.',
    });
    return;
  }

  //connect to db
  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Could not connect to the database',
    });
    db.close();
    return;
  }

  const db = client.db();

  //save to db
  try {
    const hashedPassword = hashedPassword(password);

    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!' });
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        'Internal server error. We could not log you in. Please try again!',
    });
    db.close();
    return;
  }

  db.close();
}

export default handler;
