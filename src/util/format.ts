enum Colors {
  PRIMARY = "#1a8ff0",
  ERROR = "#f0351a",
  SUCCESS = "#3bf11b",
  WARNING = "#faa12f"
};

// [ **smth** ]
function brackets(input: string) {
  return `[ **${input}** ]`;
}

// **__noun__**
function noun(input: string) {
  return `**__${input}__**`;
}

// ||[ **`code`** ]||
function hidden(input: string) {
  return `||[ **\`${input}\`** ]||`;
}

function codestr(str: string, lang = "html") {
  return "```" + lang + '\n' + str + "```";
}

export { Colors, brackets, noun, hidden, codestr };