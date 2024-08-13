import { useEffect, useState } from 'react';
// We can import axios now!
// No more yellow squiggles!!!
import axios from 'axios';

function App() {

  // It's always good to set an initial value to be a "blank" value of the same type you expect.
  const [creatureList, setCreatureList] = useState([]);
  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  // useEffect is a new hook
  // It takes in two things:
  // 1) A callback function to run
  //    It runs the callback when the component loads, and this is mostly what we use it for
  // 2) A list of variables to watch, when any of them change value, it will rerun the callback function
  //    Most of the time, this ends up being an empty list, but don't forget it or weird things happen!
  useEffect(() => {
    fetchCreatures();
  }, [])

  // Helper functions go inside our component funciton, but outside the return.
  const fetchCreatures = () => {
    // We get the creatures from the server
    axios.get('/api/creature')
      .then((response) => {
        console.log(response.data);
        // Then we update our react variable to match.
        // React will update the DOM when it notices the react variable change!
        setCreatureList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const addCreature = (event) => {
    // We hit submit in a form, so we need to stop the page refreshing
    event.preventDefault();

    // We pack up our data
    const newCreature = {
      name: newCreatureName,
      origin: newCreatureOrigin
    }

    // We send it to the server
    axios.post('/api/creature', newCreature)
      .then((response) => {
        console.log(response);

        // Clear out the inputs, for the next creature to be added.
        setNewCreatureName('');
        setNewCreatureOrigin('');

        // Fetch the updated list from the server
        fetchCreatures();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const deleteCreature = (creatureId) => {

    axios.delete(`/api/creature/${creatureId}`)
      .then((response) => {
        console.log(response);
        fetchCreatures();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const toggleCreature = (creatureId) => {

    axios.put(`/api/creature/toggle/${creatureId}`)
      .then((response) => {
        console.log(response);
        fetchCreatures();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div>

      <form onSubmit={addCreature}>
        {/* In JSX, we use the attribute 'htmlFor' instead of 'for' on our labels */}
        <label htmlFor="name">Name:</label>
        {/* Each input has an onChange listner, which will set our react variable when the fields contents are changed */}
        {/* We also set the value of that field to be the react variable.  That way, when we update the variable in other places, */}
        {/* (ike clearing it out after a post) we see the field change on the screen. */}
        <input id="name" onChange={(event) => setNewCreatureName(event.target.value)} value={newCreatureName} />

        <label htmlFor="origin">Origin:</label>
        <input id="origin" onChange={(event) => setNewCreatureOrigin(event.target.value)} value={newCreatureOrigin} />

        <button type="submit">Add New Creature</button>
      </form>

      {/* <p>{creatureList}</p> */}
      {/* We can't just put an object or an array on the DOM */}
      {/* <p>{JSON.stringify(creatureList)}</p> */}
      {/* We can turn it into a string first, that is only useful for testing */}
      {/* Because it's so ugly */}

      {/* This works, but it gets old fast: */}
      {/* <p>Getting one creature to appear on the DOM looks like this:</p>
        <p>{creatureList[0].name} is from {creatureList[0].origin}.</p> */}

      {/* So we do a loop, and we do fancy loop */}
      {/* .map() to the rescue */}
      {/* Array.map(callbackFunction) takes in a callback and applies the callback to every element of the array */}
      {/* It create array with all the results */}

      <ul>
        {creatureList.map(
          function (creature) {
            // Every list item must have a unique key
            // This purely for react to be able to keep track of things behind the scenes.
            // We started out using creature.name, but once we introduced the server we can change it to
            // creature.id, which is guarenteed to be truely unique.
            return (
              <li key={creature.id}>{creature.name} is from {creature.origin}
                <button onClick={() => {toggleCreature(creature.id)}}>
                  {creature.immortal ? 'Immortal' : 'Mortal' }
                </button>
                <button onClick={() => deleteCreature(creature.id)}>
                  🗑️
                </button>
              </li>);
          }
        )}
      </ul>

    </div>
  );
}

export default App
