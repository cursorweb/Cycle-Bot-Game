export interface EventItm {
  month: Date;
  text: string; // the text to be displayed
  boost?: number; // the boost (defaults to 10)
  category: "tpc" | "tpm" | "cpp"; // the category
}