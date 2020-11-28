enum Colors {
  PRIMARY, ERROR, SUCCESS, WARNING
};

// [ **smth** ]
function brackets(input: string) {
  return `[ **${input}** ]`;
}

// ||[ **`code`** ]||
function hidden(input: string) {
  return `||[ **\`${input}\`** ]||`;
}

function codestr(str: string, lang = "yaml") {
  return "```" + lang + '\n' + str + "```";
}

export { brackets, hidden, codestr };