export function cuuid() {
  const str = (
    Date.now().toString(16) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2) +
    Math.random().toString(16).slice(2)
  ).slice(0, 32);
  return (
    str.slice(0, 8) +
    '-' +
    str.slice(8, 12) +
    '-' +
    str.slice(12, 16) +
    '-' +
    str.slice(16, 20) +
    '-' +
    str.slice(20)
  );
}

export function makeid() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  const length = 10;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}