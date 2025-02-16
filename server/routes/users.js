import express from 'express';
import User from '../models/User.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(auth);
// Get all users
router.get('/', auth, async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.post('/updatepassword', auth, async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  console.log("this is req body", req.body);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/updateuser', auth, async (req, res, next) => {
  // console.log("this is req body ss", req.body);
  const { formForSending, user } = req.body;

  try {
    const response = await User.findById({ _id: user._id });
    if (response.password !== formForSending.password) {
      res.status(399).send("Password is incorrect");
      return;
    }
    const updateresponse = await User.findByIdAndUpdate({ _id: user._id }, formForSending, { new: true });
    console.log("response is ", updateresponse);
    res.status(200).json({
      data: updateresponse,
      message: "User updated successfully"
    });
  } catch (error) {
    console.error("Error updating user", error);
  }
})
// Get single user
router.get('/singleuser', auth, async (req, res, next) => {

  const id = req.user.userId;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user
router.put('/:id', auth, async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Delete user (admin only)
router.delete('/:id', [auth, adminAuth], async (req, res, next) => {

  console.log("this is req.params", req.params)
  console.log("this is req.user", req.user)
  if (req.params.id == req.user.userId) {
    return res.status(400).json({ message: "You can't delete yourself" })
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;