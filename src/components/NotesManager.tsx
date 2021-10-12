import React, { useState, useReducer } from 'react';
import Note from './Note';
import Api from './../api/FakeApi';

const defaultState = ['Default Thing'];

function reducerFunc(prevState: any, action: any) {
  switch(action.type) {
    case 'UPDATE': return action.notes;
    case 'ADD': return [...prevState, `Thing${prevState.length}`];

    case 'DELETE': return prevState.filter((note: any, index: number) => index !== action.i);

    default: return prevState;
  }
  return prevState;
}

const RETRY_TIMER_MILLIS = 5000;

// LIKE instance variable for a class 
const NotesManager = () => {
  const [notes, dispatch] = React.useReducer(reducerFunc, defaultState);
  const [requestQueue, setQueue] = React.useState<any[]>([]);
  
  function preDispatch (action: any) {

    if (action.type === 'ADD') {
      const actionArgs = {type: 'UPDATE', notes};
      setQueue([...requestQueue, actionArgs]);
      // Save to "DB"
      // Api.AddCall(notes, false)
      //   .then((notes: any) => dispatch(actionArgs))
      //   .then(() => console.log('on first sync'))
      //   .catch((err) => {
          
      //     console.error(err)
      //   });
    }

    // will refresh UI
    dispatch(action);
  }

  React.useEffect(() => {
    let interval: any | null = null;
    if (requestQueue.length > 0) {
      interval = setInterval(() => {
        console.log('Retry Queue:', requestQueue);
        const action = requestQueue[0];
        switch(action.type) {
          case 'UPDATE': {
            Api.AddCall(action.notes, false)
              .then((notes:any) => {
                setQueue(requestQueue.slice(1));
                dispatch(action);
              })
              .then(() => console.log('retry sync'))
              .catch((err) => {
                console.error(err)
              });
          }
        }
      }, RETRY_TIMER_MILLIS);
    }
    return () => {
      console.log('clean up');
      clearInterval(interval);
    };
  }, [requestQueue]);

 

  return <div className='container'>
    <h2>My Notes</h2>
    <button onClick={() => preDispatch({type: 'ADD'})}>Add one</button>

    {notes.map((note: any, i: number) => <Note key={i} index={i} title={note} dispatch={preDispatch} />)}
  </div>
};

export default NotesManager;