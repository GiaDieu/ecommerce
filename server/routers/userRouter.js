import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import data from '../data.js';
import { generateToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }),
);

//user signing in and get feedback all info from user and along with secret token if the user existed
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ msg: 'INVALID USER EMAIL OR PASSWORD!' });
  }),
);

userRouter.post('/register', async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    //validate
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Not all Fields have been entered' });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: 'Enter the same password twice for verification.' });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'This Email Account has been existed!' });
    }

    if (!name) name = email;

    //create an user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const createdUser = await user.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});
export default userRouter;
