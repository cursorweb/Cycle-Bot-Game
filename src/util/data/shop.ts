// the S stands for Shop
export interface SItem {
  name: string;
  description: string;

  cost: number;

  tpc?: number;
  cpp?: number;
  cpm?: number;
}

export const items: { upgrade: SItem[], idle: SItem[] } = {
  upgrade: [{
    name: "Inspiration",
    description: "The idea is the start of everything!",
    cost: 10
  }],
  
  idle: [{
    name: "First Idle",
    description: "Your very first idle machine!",
    cost: 100
  }]
};