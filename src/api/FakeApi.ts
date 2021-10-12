export default {
  AddCall: (arg, isGood) => new Promise((res, rej) => {
    setTimeout(() => {
      let val = Math.floor(Math.random() * 10);
      (val >= 7 ) ? res(arg) : rej('bad');
    }, 3000);
  }),
  
  EditCall: (arg) => new Promise((res, rej) => {
    setTimeout(() => res(arg), 3000);
  }),

  DeleteCall: (arg) => new Promise((res, rej) => {
    setTimeout(() => res(arg), 3000);
  }),

  MoveUpCall: (arg) => new Promise((res, rej) => {
    setTimeout(() => res(arg), 3000);
  }),
  
  MoveDownCall: (arg) => new Promise((res, rej) => {
    setTimeout(() => res(arg), 3000);
  }),
};