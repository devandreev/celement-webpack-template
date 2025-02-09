export default function(func: Function, delay = 900, immediate?: boolean) {
  let timerId: number;
  return (...args: any) => {
    const boundFunc = func.bind(this, ...args);
    if (timerId) {
      return;
    }
    if (immediate && !timerId) {
      boundFunc();
    }
    timerId = window.setTimeout(() => {
      if(!immediate) {
        boundFunc(); 
      }
      timerId = null; 
    }, delay);
  }
}
