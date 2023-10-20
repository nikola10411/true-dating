let timeout = null;

// call with () => fn(args?)
export function debounce(fn, time) {
  clearTimeout(timeout);
  timeout = setTimeout(fn, time);
}
