export type TermItem = {
  name: string,
  desc: string
};

export const terms: TermItem[] = [{
  name: "Text",
  desc: "Text can be posted to give you cycles! Use `&c` to get text!"
}, {
  name: "Cycles",
  desc: "The primary purpose of the game, get as much of this as possible!"
}, {
  name: "Chests",
  desc: "You have a chance of getting chests while coding, and they give you **items**! Use `&info` to see all items!"
}, {
  name: "Posting",
  desc: "Use `&p` to post your text to get cycles!"
}, {
  name: "Shop",
  desc: "The shop contains things you can buy to get cycles faster!"
}];