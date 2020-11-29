import { UserInput } from "./global";

function parse(prefix: string, command: string): UserInput | false {
  if (command.slice(0, prefix.length) != prefix) return false;

  let input = command.slice(prefix.length).trim();

  let output: string[] = [];

  // whitespace | "str" | 'str' | ident
  let r: RegExp = /(\s+)|"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([^\s]+)/g;
  let m: RegExpExecArray | null;

  while ((m = r.exec(input)) != null) output.push((m[3] || m[2] || m[0]).replace(/\\('|"|\\)/g, "$1").trim());

  output = output.filter(o => o != "");

  return { command: output[0].toLowerCase(), args: output.slice(1) };
}

export { parse };