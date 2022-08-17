// you invest an amount into a quest
// and you have 24 hours to complete the quest!
// the C stands for challenge
export interface CQuest {
  name: string;
  description: string;
  cycles: number;

  start?: { // this is the starting number, which will be manually assigned
    tpc?: string;
    cpp?: string;
    tpm?: string;
  }

  end?: { // this is how much will be needed, like start + this_number when initiated
    tpc?: string;
    cpp?: string;
    tpm?: string;
  }
}

export const quests: CQuest[] = [{
  name: "Starter Quest",
  description: "The first quest there ever was, gives you a low amount of cycles.",
  cycles: 10,
  start: {
    tpc: "5"
  },
  end: {
    tpc: "15"
  }
}, {
  name: "Proficient Coder",
  description: "Earn 5 tpm!",
  cycles: 5000,
  start: {
    tpc: "0"
  },
  end: {
    tpc: "5"
  }
}, {
  name: "Code Quest 2",
  description: "Example text",
  cycles: 5000,
  start: {
    tpc: "100"
  },
  end: {
    tpc: "150"
  }
}];