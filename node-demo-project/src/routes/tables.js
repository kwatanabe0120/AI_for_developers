const express = require('express');
const app = express();
const router = express.Router();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mock database for reservations
let reservations = [];

// Route for creating a new reservation
router.post('/reservations', (req, res) => {
  const { numberOfPeople, time, date } = req.body;
// Input validation
const errors = [];

// Validate numberOfPeople
if (numberOfPeople < 1 || numberOfPeople > 6) {
	errors.push('Number of people must be between 1 and 6.');
}

// Validate time
const validTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'];
if (!validTimes.includes(time)) {
	errors.push('Time must be between 5:00 PM and 11:00 PM, only every 30 minutes.');
}

// Validate date
const reservationDate = new Date(date);
const today = new Date();
today.setHours(0, 0, 0, 0); // Set to start of the day
if (reservationDate < today) {
	errors.push('Date must be today or in the future.');
}

// If there are validation errors, return a 400 response with the errors
if (errors.length > 0) {
	return res.status(400).json({ errors });
}
  const newReservation = { id: reservations.length + 1, numberOfPeople, time, date };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// Route for deleting (cancelling) an existing reservation
router.delete('/reservations/:id', (req, res) => {
  const { id } = req.params;
  reservations = reservations.filter(reservation => reservation.id !== parseInt(id));
  res.status(204).send();
});

module.exports = router;

// Routes setup
const indexController = require('./controllers/index');
const tablesRoutes = require('./routes/tables');
app.use('/', indexController);
app.use('/api', tablesRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});