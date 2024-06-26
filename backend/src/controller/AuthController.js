const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User_model');
// const config = require('config');
const logger = require('../logger/pino');
// const secret_key = config.get("secret_key");
const secret_key = "ebbgtrbtrnbbywhbfbtrbyrsbts"

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // const hashedPassword = await bcrypt.hash(password,config.get('saltWorkFactor'));
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({status: 'success', message: 'User registered successfully' });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, secret_key);
    const name=user.name;
    res.status(200).json({status: 'success', token,name: name,email:email});
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };
