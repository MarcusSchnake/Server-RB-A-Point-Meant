import logo from './logo.svg';
import './App.css';
import Calendar from 'react-calendar';

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='App'>
      <h1 className='text-center'>APointMeant Calendar</h1>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date} />
        </div>
        <p className='text-center'>
          <span className='bold'>Selected Date:</span>{' '}
          {date.toDateString()}
        </p>
    </div>
  );
}

export default App;
