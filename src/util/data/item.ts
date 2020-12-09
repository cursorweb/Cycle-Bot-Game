// the B stands for Boost
export interface BItem {
  name: string;
  emoji: string;

  worth: number;

  tpc?: number;
  cpp?: number;
  tpm?: number;
}

export const items: BItem[] = [];