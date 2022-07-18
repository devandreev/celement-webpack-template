export default function(func, delay = 900, immediate) {
  let timerId;
  return (...args) => {
    const boundFunc = func.bind(this, ...args);
    if (timerId) {
      return;
    }
    if (immediate && !timerId) {
      boundFunc();
    }
    timerId = setTimeout(() => {
      if(!immediate) {
        boundFunc(); 
      }
      timerId = null; 
    }, delay);
  }
}
