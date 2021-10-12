import React, { useState, useReducer } from 'react';
import Note from './Note';
import Api from './../api/FakeApi';
import useActionRequestQueue from './../hooks/useActionRequestQueue';

const defaultState = ['Eduardo'];

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
  const { push } = useActionRequestQueue(dispatch, RETRY_TIMER_MILLIS);
  
  function preDispatch (action: any) {

    if (action.type === 'ADD') {
      const actionArgs = {type: 'UPDATE', notes};
      push({promise: () => Api.AddCall(notes, false), cbArgs: actionArgs});
    }

    // will refresh UI
    dispatch(action);
  } 

  return <div className='container'>
    <h2>My Notes</h2>
    <button onClick={() => preDispatch({type: 'ADD'})}>Add one</button>

    {notes.map((note: any, i: number) => <Note key={i} index={i} title={note} dispatch={preDispatch} />)}
  </div>
};

export default NotesManager;