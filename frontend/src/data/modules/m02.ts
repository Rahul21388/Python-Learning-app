import { Module } from "../types";

export const m02: Module = {
  id: "module_02",
  title: "Operators",
  description: "Do math, compare values, and combine conditions with operators.",
  icon: "calculator",
  lessons: [
    {
      lessonId: "l_02_01",
      title: "Arithmetic Operators",
      time: "5 min",
      content:
        "Python supports the usual math operators: + add, - subtract, * multiply, / divide. Division with / always returns a float.",
      code: "print(7 + 3)   # 10\nprint(7 - 3)   # 4\nprint(7 * 3)   # 21\nprint(7 / 2)   # 3.5",
      keys: [
        "+ - * / do basic arithmetic.",
        "/ always returns a float.",
        "Follow normal math order of operations.",
      ],
      quiz: [
        {
          q: "What does 7 / 2 return?",
          options: ["3", "3.5", "4", "'3.5'"],
          answer: 1,
          explanation: "The / operator always gives a float, so 3.5.",
        },
        {
          q: "What does 3 * 4 equal?",
          options: ["7", "12", "34", "1"],
          answer: 1,
          explanation: "* multiplies, giving 12.",
        },
      ],
    },
    {
      lessonId: "l_02_02",
      title: "Floor Division & Modulo",
      time: "5 min",
      content:
        "// does floor division (drops the remainder) and % (modulo) returns the remainder. Modulo is great for checking even/odd numbers.",
      code: "print(7 // 2)  # 3\nprint(7 % 2)   # 1\nprint(10 % 2)  # 0 (even)",
      keys: [
        "// divides and drops the decimal part.",
        "% returns the remainder.",
        "n % 2 == 0 means n is even.",
      ],
      quiz: [
        {
          q: "What does 7 % 3 return?",
          options: ["2", "1", "3", "0"],
          answer: 1,
          explanation: "7 divided by 3 leaves a remainder of 1.",
        },
        {
          q: "What does 9 // 2 return?",
          options: ["4.5", "5", "4", "1"],
          answer: 2,
          explanation: "Floor division drops the remainder, giving 4.",
        },
      ],
    },
    {
      lessonId: "l_02_03",
      title: "Exponents",
      time: "4 min",
      content:
        "The ** operator raises a number to a power. For example 2 ** 3 means 2 to the power of 3.",
      code: "print(2 ** 3)   # 8\nprint(5 ** 2)   # 25\nprint(9 ** 0.5) # 3.0 (square root)",
      keys: [
        "** raises a number to a power.",
        "2 ** 3 is 2 x 2 x 2 = 8.",
        "A power of 0.5 gives a square root.",
      ],
      quiz: [
        {
          q: "What does 3 ** 2 equal?",
          options: ["6", "9", "5", "32"],
          answer: 1,
          explanation: "3 to the power of 2 is 3 x 3 = 9.",
        },
      ],
    },
    {
      lessonId: "l_02_04",
      title: "Comparison Operators",
      time: "5 min",
      content:
        "Comparisons return a boolean: == equal, != not equal, > greater, < less, >= and <=. Note == (compare) is different from = (assign).",
      code: "print(5 == 5)  # True\nprint(5 != 3)  # True\nprint(3 > 7)   # False",
      keys: [
        "Comparisons return True or False.",
        "== compares; = assigns.",
        "Includes >, <, >=, <=, ==, !=.",
      ],
      quiz: [
        {
          q: "Which operator checks if two values are equal?",
          options: ["=", "==", "!=", "=>"],
          answer: 1,
          explanation: "== compares for equality; = assigns a value.",
        },
        {
          q: "What does 4 != 4 return?",
          options: ["True", "False", "4", "Error"],
          answer: 1,
          explanation: "4 is equal to 4, so 'not equal' is False.",
        },
      ],
    },
    {
      lessonId: "l_02_05",
      title: "Logical Operators",
      time: "5 min",
      content:
        "and, or, and not combine or invert booleans. and is True only if both sides are True; or is True if either side is True; not flips the value.",
      code: "print(True and False)  # False\nprint(True or False)   # True\nprint(not True)        # False",
      keys: [
        "and: True only if both are True.",
        "or: True if at least one is True.",
        "not: flips True to False and vice versa.",
      ],
      quiz: [
        {
          q: "What does True and False return?",
          options: ["True", "False", "None", "Error"],
          answer: 1,
          explanation: "and requires both sides True; one is False, so False.",
        },
        {
          q: "What does not False return?",
          options: ["True", "False", "None", "0"],
          answer: 0,
          explanation: "not inverts False to True.",
        },
      ],
    },
    {
      lessonId: "l_02_06",
      title: "Assignment Shortcuts",
      time: "4 min",
      content:
        "Operators like +=, -=, *= update a variable using its current value. x += 1 is short for x = x + 1.",
      code: "x = 10\nx += 5   # x is now 15\nx *= 2   # x is now 30\nprint(x)",
      keys: [
        "+= adds and reassigns in one step.",
        "Also -=, *=, /=, //=, %=.",
        "x += 1 means x = x + 1.",
      ],
      quiz: [
        {
          q: "After x = 4; x += 3, what is x?",
          options: ["3", "4", "7", "43"],
          answer: 2,
          explanation: "+= adds 3 to 4, giving 7.",
        },
      ],
    },
    {
      lessonId: "l_02_07",
      title: "Operator Precedence",
      time: "5 min",
      content:
        "Python follows math order of operations: exponents first, then multiply/divide, then add/subtract. Use parentheses to make intent clear and change order.",
      code: "print(2 + 3 * 4)     # 14\nprint((2 + 3) * 4)   # 20",
      keys: [
        "** before * / before + -.",
        "Parentheses override default order.",
        "Use () to keep complex expressions clear.",
      ],
      quiz: [
        {
          q: "What does 2 + 3 * 4 equal?",
          options: ["20", "14", "24", "9"],
          answer: 1,
          explanation: "Multiplication happens first: 3*4=12, then +2 = 14.",
        },
        {
          q: "How do you force addition to happen first?",
          options: [
            "Use parentheses",
            "Use a comma",
            "Use quotes",
            "You can't",
          ],
          answer: 0,
          explanation: "Parentheses control evaluation order.",
        },
      ],
    },
    {
      lessonId: "l_02_08",
      title: "String Concatenation & Repetition",
      time: "4 min",
      content:
        "With strings, + joins them and * repeats them. This is handy for building text and simple patterns.",
      code: "print('ab' + 'cd')  # abcd\nprint('ha' * 3)     # hahaha",
      keys: [
        "+ joins two strings.",
        "* repeats a string a number of times.",
        "You can't add a string and a number directly.",
      ],
      quiz: [
        {
          q: "What does 'go' * 2 produce?",
          options: ["gogo", "go go", "goo", "Error"],
          answer: 0,
          explanation: "* repeats the string, giving 'gogo'.",
        },
      ],
    },
    {
      lessonId: "l_02_09",
      title: "The in Operator",
      time: "4 min",
      content:
        "in checks whether a value exists inside a string, list, or other collection. It returns a boolean.",
      code: "print('a' in 'cat')     # True\nprint(3 in [1, 2, 3])   # True",
      keys: [
        "in tests for membership.",
        "Works on strings, lists, and more.",
        "Returns True or False.",
      ],
      quiz: [
        {
          q: "What does 'x' in 'box' return?",
          options: ["True", "False", "'x'", "Error"],
          answer: 0,
          explanation: "The letter x appears in 'box', so True.",
        },
      ],
    },
    {
      lessonId: "l_02_10",
      title: "Combining Conditions",
      time: "5 min",
      content:
        "Real programs often check several things at once. Combine comparisons with and/or to express complex rules clearly.",
      code: "age = 20\nprint(age >= 18 and age < 65)  # True",
      keys: [
        "Chain comparisons with and / or.",
        "Group with parentheses for clarity.",
        "Each comparison yields a boolean first.",
      ],
      quiz: [
        {
          q: "What does (5 > 2) and (2 > 3) return?",
          options: ["True", "False", "5", "Error"],
          answer: 1,
          explanation: "The second condition is False, so and gives False.",
        },
        {
          q: "What does (1 == 1) or (2 == 3) return?",
          options: ["True", "False", "None", "Error"],
          answer: 0,
          explanation: "or is True if either side is True; the first is True.",
        },
      ],
    },
  ],
};
