function randomChoice<T>(array: T[], amount = 1): T[] {
  let out = [];
  for (let i = 0; i < amount; i++) {
    out.push(array[Math.floor(array.length * Math.random())]);
  }

  return out;
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function padstr(text: string, length: number, pad = "0") {
  let amount = length - text.length;
  if (amount <= 0) return text;
  return text.padStart(amount, pad);
}

/** Adds Commas */
function commanum(inp: string) {
  let val = inp.replace(/,/g, "");
  let valSplit = val.split('.');

  while (/(\d+)(\d{3})/.test(valSplit[0].toString())) valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, "$1,$2");

  return valSplit.length == 2 ? valSplit[0] + "." + valSplit[1] : valSplit[0];
}

/** Turns 1e+3 to 1000 */
function expandnum(val: string) {
  let data = val.split(/[eE]/);
  if (data.length == 1) return data[0];

  let z = "";
  let sign = Number(val) < 0 ? '-' : "";
  let str = data[0].replace('.', "");
  let mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += '0';
    return z + str.replace(/^\-/, "");
  }

  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}

function plural(amount: number, singular = "", plural = "s") {
  return amount == 1 ? singular : plural;
}

export { randomChoice, random, padstr, commanum, expandnum, plural };