require("dotenv").config();

const express = require("express");
const dbConnection = require("./db");
const controllers = require("./controllers/indexController");
const cors = require('cors');
const jwt = require("./middleware/validate-jwt");

const app = express();

app.use(require("./middleware/headers"));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use("./user", controllers.userController);// endpoint beginning with /user
app.use("./appointment", controllers.appointmentController); // endpoint beginning with /art
app.use("./todo", controllers.toDoController);


dbConnection.authenticate() 
    .then(() => dbConnection.sync(
        {force: true}
    ))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]:App is listening on port ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });









// import Calendar from 'react-calendar';
// import {Inject, ScheduleComponent,Day, Week, Month, Agenda, Time} from '@syncfusion/ej2-react-schedule';
// //react Calendar base code
// function App() {
//   const [date, setDate] = useState(new Date());

//   return (
//     <div className='App'>
//       <h1 className='text-center'>APointMeant Calendar</h1>
//       <div className='calendar-container'>
//         <Calendar onChange={setDate} value={date} />
//         </div>
//         <p className='text-center'>
//           <span className='bold'>Selected Date:</span>{' '}
//           {date.toDateString()}
//         </p>
//     </div>
//   );
// }

// export default App;
