export const intervalTimer = (callback: () => any, interval: number) => {
  let timerId: number,
    startTime: number,
    remaining: number = 0;
  let state:number = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

  const pause = () => {
    if (state !== 1) return;
    remaining = interval - (new Date().getTime() - startTime);
    window.clearInterval(timerId);
    state = 2;
  };

  const resume =  (newSpeed: number) => {
    if (state !== 2) return;

    state = 3;
    window.setTimeout(()=>timeoutCallback(newSpeed), remaining);
  };

  const timeoutCallback =  (speed:number) => {
    if (state !== 3) return;

    callback();
    startTime = new Date().getTime();
    timerId = window.setInterval(callback, speed);
    state = 1;
  };

  startTime = new Date().getTime();
  timerId = window.setInterval(callback, interval);
  state = 1;
  return {
      resume,pause
  }
};
