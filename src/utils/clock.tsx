export const intervalTimer = (callback: () => any, interval: number) => {
  let timerId: number,
    startTime: number,
    remaining: number = 0;
  let state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

  const pause = () => {
    if (state !== 1) return;
    console.log(startTime)
    remaining = interval - (new Date().getDate() - startTime);
    window.clearInterval(timerId);
    state = 2;
  };

  const resume =  () => {
    if (state !== 2) return;

    state = 3;
    window.setTimeout(timeoutCallback, remaining);
  };

  const timeoutCallback =  () => {
    if (state !== 3) return;

    callback();

    startTime = new Date().getTime();
    timerId = window.setInterval(callback, interval);
    state = 1;
  };

  startTime = new Date().getTime();
  timerId = window.setInterval(callback, interval);
  state = 1;

  return {
      resume,pause
  }
};