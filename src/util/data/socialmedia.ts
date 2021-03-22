export interface BSocialMedia {
  name: string;
  amt: number; // amount of boost in all categories, tpc, cpp, and tpm
  price: number; // in cycles
}

export const socialMedia: BSocialMedia[] = [{
  name: "Repl.it",
  amt: 0.1,
  price: 350
}, {
  name: "Glitch.com",
  amt: 0.3,
  price: 400
}, {
  name: "GitHub",
  amt: 0.5,
  price: 500
}, {
  name: "Dev.To",
  amt: 0.8,
  price: 666
}, {
  name: "YouTube",
  amt: 1.2,
  price: 1000
}, {
  name: "Twitch",
  amt: 1.7,
  price: 1650
}, {
  name: "Instagram",
  amt: 2,
  price: 2222
}, {
  name: "Twitter",
  amt: 2.1,
  price: 2500
}, {
  name: "Facebook",
  amt: 2.2,
  price: 2800
}, {
  name: "Reddit",
  amt: 2.4,
  price: 3333
}, {
  name: "Vimeo",
  amt: 2.45,
  price: 3500
}, {
  name: "Hulu",
  amt: 2.5,
  price: 3600
}, {
  name: "Netflix",
  amt: 2.55,
  price: 3790
}, {
  name: "TikTok",
  amt: 2.6,
  price: 4000
}];