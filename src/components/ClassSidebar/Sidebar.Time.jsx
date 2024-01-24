import React, { useState, useEffect } from 'react';

function LocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className='text-3xl font-bold px-3 bg-base-200 rounded-lg mx-3'>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>;
}

export default LocalTime;