import { UserInput } from "./global";

function parse(prefix: string, command: string): UserInput | false {
  if (command.slice(0, prefix.length) != prefix) return false;

  const input = reformatStr(command.slice(prefix.length));
  if (!/(\s+)|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g.test(input)) return false;

  let output: string[] = [];

  // whitespace | "str" | 'str' | ident
  const r = /(\s+)|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
  let m: RegExpExecArray | null;

  while ((m = r.exec(input)) != null) output.push((m[3] || m[2] || m[0]).replace(/\\('|"|\\)/g, "$1").trim());

  output = output.filter(o => o != "");

  return { command: output[0].toLowerCase(), args: output.slice(1) };
}

function reformatStr(str: string) {
  return str
    .trim()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, "\"")
  ;
}

export { parse };