export interface TriviaItem {
  code: string;
  line: number;
  lang: string;
}

export const users = ["Mr. Coder", "Bob", "Coder100", "Tom", "Mr. 100", "Six", "Snowy", "Alt", "Hithere", "John"];

export const trivia: TriviaItem[] = [{
  code: `console
  .log(a);
let a = 5;`,
  line: 2,
  lang: "JavaScript"
}, {
  code: `#include <iostream>
int main() {
  cout <<
  "Hello, world!" << endl;
  return 0;
}`,
  line: 3,
  lang: "C++"
}, {
  code: `using System;
class MainClass {
  static
  void
  Main
  (string[] args) {
    Console.WriteLine("Hello, world!");
  }
}`,
  line: 3,
  lang: "C#"
}, {
  code: `a = True
print(
  if a == True
    'a is true'
  else
    'a is false'
)`,
  line: 3,
  lang: "Python"
}, {
  code: `var leaderboard = {
  Coder100: { score: 3 },
  altarium: { score: 6 },
  nou: { score: 8 }
};

console.log(leaderboard
  .coder100
  .score
);`,
  line: 9,
  lang: "JavaScript"
}, {
  code: `a = 5
b = "3"

print(
  a
  +
  b
)`,
  line: 5,
  lang: "Python"
}, {
  code: `a = int(input("Enter a number: ")
b = int(input("Enter another one: "))

print(f"{a} + {b} = {a + b}")`,
  line: 1,
  lang: "Python"
}, {
  code: `a = 7
b = 6

if b == a:
  print("something really bad just happened!")
 print("is your computer broken?")`,
  line: 6,
  lang: "Python"
}, {
  code: `#include <iostream>
int main() {
  std::string a = "hi";
  switch (a) {
    case "hello":
      std::cout << "a is hello" << std::endl;
      break;
    default:
      std::cout << "idk" << std::endl;
      break;
  }
}`,
  line: 4,
  lang: "C++"
}, {
  code: `a = "3"
b = "4"

print(
  "Hello"
  " World",
  a
  b
)`,
  line: 8,
  lang: "Python"
}, {
  code: `let a;
a.b = 5;
console.log(a.b);`,
  line: 2,
  lang: "JavaScript"
}, {
  code: `class MyClass {
  constructor(callback) {
    this .callback = callback;
  }

  hook(element) {
    element.addEventListener("click", e => {
      this.callback(e);
    });
  }
}`,
  line: 8,
  lang: "JavaScript"
}, {
  code: `export default function element() {
  return (
    <>
      <
        input
        placeholder="Enter your text: "
      >
    </>
  );
}`,
  line: 7,
  lang: "React"
}];