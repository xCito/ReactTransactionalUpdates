import React from 'react';

interface NoteProps {
  title: string,
  index: number,
  dispatch: any
}

const Note = ({title, index, dispatch}: NoteProps) => {
  return <div className='note'>
    <p>{title}</p>
    <button>Edit</button>
    <button onClick={() => dispatch({type: 'DELETE', i: index})}>Delete</button>
    <button>Move Up</button>
    <button>Move Down</button>
  </div>
};

export default Note;