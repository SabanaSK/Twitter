<<<<<<< HEAD
import db from'../database/database.js';
=======
import express from 'express';
import db from '../database/database.js';

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
>>>>>>> 45f2e69a886ecb605412f4f1ab96c03416875807
