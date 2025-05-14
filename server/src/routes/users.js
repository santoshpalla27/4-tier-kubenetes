const express = require('express');
const db = require('../db');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    if (!name && !email) {
      return res.status(400).json({ error: 'At least one field is required for update' });
    }
    
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await db.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name || user[0].name, email || user[0].email, id]
    );
    
    res.json({
      id: Number(id),
      name: name || user[0].name,
      email: email || user[0].email
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;