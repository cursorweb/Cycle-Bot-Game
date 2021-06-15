export interface TriviaItem {
  code: string;
  line: number;
  lang: string;
}

export const trivia: TriviaItem[] = [{
  code: `console.log(a);
let a = 5;`,
  line: 1,
  lang: "JavaScript"
}, {
  code: `#include <iostream>
int main() {
  cout << "Hello, world!" << endl;
}`,
  line: 3,
  lang: "C++"
}, {
  code: `using System;
class MainClass {
  static void Main(string[] args) {
    Console.WriteLine("Hello, world!");
  }
}`,
  line: 3,
  lang: "C#"
}, {
  code: `a = True
print(if a == True 'a is true' else 'a is false')`,
  line: 2,
  lang: "Python"
}, {
  code: `var leaderboard = {
  Coder100: { score: 3 },
  altarium: { score: 6 },
  nou: { score: 8 }
};

console.log(leaderboard.coder100.score);`,
  line: 7,
  lang: "JavaScript"
}];