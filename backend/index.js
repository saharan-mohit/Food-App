
// const cors = require('cors');
// const express = require('express')
// const app = express()
// const port = 4000
// const mongoDb = require("./db");
// mongoDb();



// // Allow requests from all origins (you can restrict it as needed)
// app.use(cors());

// app.use((req,res,next)=>{
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   next();
// })


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use(express.json());
// app.use('/api',require("./Routes/CreateUser"));
// app.use('/api',require("./Routes/DisplayData"));
// app.use('/api',require("./Routes/OrderData"));
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;
const mongoDb = require('./db');
mongoDb();

// Define allowed origins
const allowedOrigins = ['http://localhost:3000', 'https://food-app-frontend-five.vercel.app'];

// Configure CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
