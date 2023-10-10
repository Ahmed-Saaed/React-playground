import {useState} from 'react';
import data from './data';
import List from './List';

const App = () => {
  const [people, setpeople] = useState(data);

  return (
    <main>
      <section className='container'>
        <h3>{people.length} Birthdays</h3>
        <List people={people} />
        <button
          className='btn btn-block'
          type='button'
          onClick={() => setpeople([])}
        >
          clear all
        </button>
      </section>
    </main>
  );
};
export default App;
