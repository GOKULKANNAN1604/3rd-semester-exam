const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const app = express();
const port =  5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://gokulkannan:gokulkannan@model.tumsyii.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//secret key
  const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key:', secretKey);



  //Faculty register
const Userschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile:Number,
  
});

const Users = mongoose.model('Users', Userschema);

app.post('/register', async (req, res) => {
  const { username, email, password,mobile} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
      mobile,
      
    });

    await newUser.save();
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/login', limiter);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//admin register
const AdminUserschema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  mobile:Number,
  
});

const AdminUsers = mongoose.model('AdminUsers', AdminUserschema);

app.post('/adminregister', async (req, res) => {
  const { username, email, password,mobile} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminUsers({
      username,
      email,
      password: hashedPassword,
      mobile,
      
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: '50h', // Set the expiration time as needed
    });
    res.json({ success: true,token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const limiters = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts from this IP. Please try again later.',
});

app.use('/adminlogin', limiters);

app.post('/adminlogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUsers.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '5h', // Set the expiration time as needed
    });
    res.status(200).json({ message: 'Login successful' ,token});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//////////////network engineers
const networkEngineerSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  secretCode: String,
  password: String,
});

const NetworkEngineer = mongoose.model('NetworkEngineer', networkEngineerSchema);

// Handle POST requests to /engineerregister
app.post('/engineerregister', async (req, res) => {
  const { username, email, phone, secretCode, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    const engineer = new NetworkEngineer({
      username,
      email,
      phone,
      secretCode,
      password: hashedPassword, 
    });

    await engineer.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data to the database' });
  }
});

// ...

app.post('/englogin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const engineer = await NetworkEngineer.findOne({ email });

    if (!engineer) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, engineer.password);

    if (passwordMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login error' });
  }
});

//////////faculty issue
const facultySchema = new mongoose.Schema({
  name: String,
  department: String,  
  issueType: String,
  location: String,
  description: String,
});

const Faculty = mongoose.model('Faculty', facultySchema);


app.post('/faculty', async (req, res) => {
  const facultyData = req.body.faculty;
  if (!facultyData.name || !facultyData.department || !facultyData.issueType || !facultyData.location) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const faculty = new Faculty(facultyData);
    await faculty.save();
    res.status(200).json({ message: 'Faculty data stored successfully' });
  } catch (error) {
    console.error('Error saving faculty data:', error);
    res.status(500).json({ error: 'Error saving faculty data' });
  }
});

app.get('/faculty', async (req, res) => {
  try {
    const facultyDetails = await Faculty.find();
    res.status(200).json(facultyDetails);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ error: 'Error fetching faculty details' });
  }
});


// Update the status of a faculty record
// Update the status of a faculty record
app.put('/faculty/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const faculty = await Faculty.findByIdAndUpdate( // Use the Faculty model, not NetworkEngineer
      id,
      { $set: { status } }, // Correctly update the "status" field
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({ message: 'Faculty record not found' });
    }

    res.status(200).json({ message: 'Status updated successfully', faculty });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Status update error' });
  }
});

//////////
const DailyUpdateSchema = new mongoose.Schema({
  description: String,
  department: String,
});

const DailyUpdates = mongoose.model('DailyUpdate', DailyUpdateSchema);
app.post('/dailyupdate', async (req, res) => {
  const { description, department } = req.body;

  try {
    const newUpdate = new DailyUpdates({
      description,
      department,
    });

    await newUpdate.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/dailyupdate', async (req, res) => {
  try {
    const updates = await DailyUpdates.find(); // Retrieve all daily updates
    res.status(200).json(updates);// Assuming you're using a template engine like EJS or Handlebars
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
