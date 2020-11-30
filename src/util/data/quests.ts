// the C stands for challenge
export interface CQuest {
  name: string;
  description: string;
  cycles: number;

  start?: { // this is the starting number, which will be manually assigned
    tpc?: string;
    cpp?: string;
    cpm?: string;
  }

  end?: { // this is how much will be needed, like start + this_number when initiated
    tpc?: string;
    cpp?: string;
    cpm?: string;
  }
}

export const quests: CQuest[] = [];