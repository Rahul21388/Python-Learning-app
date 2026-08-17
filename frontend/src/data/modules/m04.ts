import { Module } from "../types";

export const m04: Module = {
  id: "module_04",
  title: "Control Flow",
  description: "Make decisions in your code with if, elif and else.",
  icon: "git-branch",
  lessons: [
    {
      lessonId: "l_04_01",
      title: "The if Statement",
      time: "5 min",
      content:
        "An if statement runs a block of code only when a condition is True. The condition is followed by a colon, and the block is indented.",
      code: "age = 20\nif age >= 18:\n    print('Adult')",
      keys: [
        "if runs code only when the condition is True.",
        "End the condition line with a colon.",
        "Indent the body of the if.",
      ],
      quiz: [
        {
          q: "When does an if block run?",
          options: [
            "Always",
            "Only when its condition is True",
            "Only when False",
            "Never",
          ],
          answer: 1,
          explanation: "The indented block runs only if the condition is True.",
        },
        {
          q: "What punctuation ends an if condition line?",
          options: ["A semicolon", "A colon", "A period", "A comma"],
          answer: 1,
          explanation: "Python uses a colon before an indented block.",
        },
      ],
    },
    {
      lessonId: "l_04_02",
      title: "else",
      time: "4 min",
      content:
        "An else block runs when the if condition is False. It provides an alternative path.",
      code: "age = 15\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
      keys: [
        "else runs when if is False.",
        "You can have at most one else.",
        "else has no condition of its own.",
      ],
      quiz: [
        {
          q: "When does the else block run?",
          options: [
            "When if is True",
            "When if is False",
            "Always",
            "Never",
          ],
          answer: 1,
          explanation: "else is the fallback for when the if condition fails.",
        },
      ],
    },
    {
      lessonId: "l_04_03",
      title: "elif",
      time: "5 min",
      content:
        "elif ('else if') checks another condition when the previous ones were False. You can chain several elif blocks.",
      code: "score = 82\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
      keys: [
        "elif adds more conditions to check.",
        "Only the first True branch runs.",
        "Order your conditions carefully.",
      ],
      quiz: [
        {
          q: "What does elif mean?",
          options: ["end if", "else if", "each if", "exit if"],
          answer: 1,
          explanation: "elif is short for 'else if'.",
        },
        {
          q: "In a chain, how many branches run?",
          options: [
            "All True ones",
            "Only the first True one",
            "Only the last",
            "None",
          ],
          answer: 1,
          explanation: "Python runs only the first branch whose condition is True.",
        },
      ],
    },
    {
      lessonId: "l_04_04",
      title: "Nested if",
      time: "5 min",
      content:
        "You can place an if inside another if to check conditions in stages. Each level adds another indent.",
      code: "if logged_in:\n    if is_admin:\n        print('Admin panel')",
      keys: [
        "if statements can be nested.",
        "Each nesting level adds indentation.",
        "Keep nesting shallow for readability.",
      ],
      quiz: [
        {
          q: "What happens with nested ifs?",
          options: [
            "The inner if checks only if the outer is True",
            "Both always run",
            "They cause errors",
            "Order doesn't matter",
          ],
          answer: 0,
          explanation:
            "The inner if is reached only when the outer condition is True.",
        },
      ],
    },
    {
      lessonId: "l_04_05",
      title: "Truthy and Falsy",
      time: "5 min",
      content:
        "In a condition, some values act as False even though they aren't the boolean False: 0, empty string '', empty list [], and None. Everything else is 'truthy'.",
      code: "name = ''\nif name:\n    print('has name')\nelse:\n    print('empty')  # this runs",
      keys: [
        "0, '', [], {}, None are falsy.",
        "Most other values are truthy.",
        "You can test a value directly in if.",
      ],
      quiz: [
        {
          q: "Which value is falsy?",
          options: ["1", "'hi'", "0", "[1]"],
          answer: 2,
          explanation: "0 is treated as False in a condition.",
        },
        {
          q: "Is an empty string '' truthy or falsy?",
          options: ["Truthy", "Falsy", "Neither", "It errors"],
          answer: 1,
          explanation: "Empty strings are falsy.",
        },
      ],
    },
    {
      lessonId: "l_04_06",
      title: "Comparison in Conditions",
      time: "4 min",
      content:
        "Conditions usually combine comparison operators. You can chain them naturally, like 0 < x < 10.",
      code: "x = 5\nif 0 < x < 10:\n    print('single digit')",
      keys: [
        "Conditions are boolean expressions.",
        "Python allows chained comparisons.",
        "0 < x < 10 reads like math.",
      ],
      quiz: [
        {
          q: "What does 0 < 5 < 10 evaluate to?",
          options: ["True", "False", "5", "Error"],
          answer: 0,
          explanation: "5 is between 0 and 10, so the chain is True.",
        },
      ],
    },
    {
      lessonId: "l_04_07",
      title: "Logical Operators in if",
      time: "5 min",
      content:
        "Combine multiple conditions inside an if using and / or to express richer rules.",
      code: "age = 25\nif age >= 18 and age <= 60:\n    print('working age')",
      keys: [
        "Use and when both must be True.",
        "Use or when either is enough.",
        "Parentheses clarify complex logic.",
      ],
      quiz: [
        {
          q: "Which keyword requires BOTH conditions to be True?",
          options: ["or", "and", "not", "if"],
          answer: 1,
          explanation: "and is True only when both sides are True.",
        },
      ],
    },
    {
      lessonId: "l_04_08",
      title: "The Ternary Expression",
      time: "5 min",
      content:
        "A one-line if/else expression lets you choose a value inline: value_if_true if condition else value_if_false.",
      code: "age = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)  # Adult",
      keys: [
        "Ternary picks a value in one line.",
        "Form: A if condition else B.",
        "Great for short, simple choices.",
      ],
      quiz: [
        {
          q: "What does \"'yes' if True else 'no'\" return?",
          options: ["'yes'", "'no'", "True", "Error"],
          answer: 0,
          explanation: "Since the condition is True, it returns 'yes'.",
        },
      ],
    },
    {
      lessonId: "l_04_09",
      title: "pass and Empty Blocks",
      time: "4 min",
      content:
        "Python requires a block after a colon. When you have nothing to put there yet, use pass as a placeholder to avoid an error.",
      code: "if ready:\n    pass  # TODO: add logic later",
      keys: [
        "Every block needs at least one statement.",
        "pass does nothing but satisfies the syntax.",
        "Useful as a placeholder while planning.",
      ],
      quiz: [
        {
          q: "What does pass do?",
          options: [
            "Skips to the next loop",
            "Nothing — it's a placeholder",
            "Ends the program",
            "Raises an error",
          ],
          answer: 1,
          explanation: "pass is a no-op placeholder that satisfies the syntax.",
        },
      ],
    },
    {
      lessonId: "l_04_10",
      title: "match Statements",
      time: "5 min",
      content:
        "Python 3.10+ offers match/case for comparing a value against several patterns — a clean alternative to long if/elif chains.",
      code: "command = 'start'\nmatch command:\n    case 'start':\n        print('Starting')\n    case 'stop':\n        print('Stopping')\n    case _:\n        print('Unknown')",
      keys: [
        "match/case compares one value to patterns.",
        "case _ is the catch-all default.",
        "Available in Python 3.10 and newer.",
      ],
      quiz: [
        {
          q: "What does 'case _' represent in a match?",
          options: [
            "A syntax error",
            "The default / catch-all case",
            "An empty case",
            "The first case",
          ],
          answer: 1,
          explanation: "The underscore case matches anything not matched above.",
        },
        {
          q: "From which Python version is match available?",
          options: ["3.6", "3.8", "3.10", "2.7"],
          answer: 2,
          explanation: "Structural pattern matching arrived in Python 3.10.",
        },
      ],
    },
  ],
};
