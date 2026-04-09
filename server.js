// =============================================
//  Q6 - MongoDB CRUD Operations Demo
//  Tech: Node.js + Mongoose + Express
// =============================================

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── 1. Connect to MongoDB ──────────────────
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅  Connected to MongoDB'))
.catch(err => console.error('❌  MongoDB connection error:', err));

// ── 2. Define Schema & Model ───────────────
const studentSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  rollNo:  { type: Number, required: true, unique: true },
  branch:  { type: String, required: true },
  marks:   { type: Number, min: 0, max: 100 },
  email:   { type: String, lowercase: true, trim: true }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

// ── 3. CRUD Routes ─────────────────────────

// CREATE - Add new student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json({ success: true, message: 'Student created!', data: saved });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// READ ALL - Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// READ ONE - Get student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE - Update student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student updated!', data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE - Delete student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json({ success: true, message: 'Student deleted!', data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 4. Start Server ────────────────────────
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});
