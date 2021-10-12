import React from 'react';
import Api from './../api/FakeApi';

const useActionRequestQueue = (cb, RETRY_TIMER_MILLIS) => {
  const [requestQueue, setQueue] = React.useState<any[]>([]);

  const push = ({promise, cbArgs}) => {
    setQueue([...requestQueue, {promise, cbArgs}]);
  }

  React.useEffect(() => {
    let interval: any | null = null;
   
    if (requestQueue.length > 0) {
      interval = setInterval(() => {
        console.log('Retry Queue:', requestQueue);
        const {promise, cbArgs} = requestQueue[0];

        promise().then((notes:any) => {
          setQueue(requestQueue.slice(1));
          cb(cbArgs);
          console.log('retry sync');
        })
        .catch((err) => {
          console.error(err)
        });        
      }, RETRY_TIMER_MILLIS);

    }
    return () => {
      console.log('clean up');
      clearInterval(interval);
    };
  }, [requestQueue]);

  return {push};
};

export default useActionRequestQueue;