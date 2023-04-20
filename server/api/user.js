import express from 'express';
import db from '../database/db.json' assert { type: 'json' };


const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  const user = { email, password, username };
  const users = await db.get('users').value();
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    await db.get('users').push(user).write();
    res.status(201).json({ message: 'User created' });
  }
});

export default router;
