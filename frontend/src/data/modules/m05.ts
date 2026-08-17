import { Module } from "../types";

export const m05: Module = {
  id: "module_05",
  title: "Loops",
  description: "Repeat actions efficiently with for and while loops.",
  icon: "repeat",
  lessons: [
    {
      lessonId: "l_05_01",
      title: "The for Loop",
      time: "5 min",
      content:
        "A for loop repeats a block once for each item in a sequence, such as a list or string. The loop variable takes each value in turn.",
      code: "for letter in 'abc':\n    print(letter)\n# a b c (each on a line)",
      keys: [
        "for iterates over each item in a sequence.",
        "The loop variable holds the current item.",
        "The body is indented like other blocks.",
      ],
      quiz: [
        {
          q: "What does a for loop iterate over?",
          options: [
            "Only numbers",
            "Items in a sequence",
            "Random values",
            "Nothing",
          ],
          answer: 1,
          explanation: "A for loop steps through each item in a sequence.",
        },
      ],
    },
    {
      lessonId: "l_05_02",
      title: "range()",
      time: "5 min",
      content:
        "range() generates a sequence of numbers, commonly used with for loops. range(5) gives 0,1,2,3,4 (the end is excluded).",
      code: "for i in range(3):\n    print(i)\n# 0 1 2",
      keys: [
        "range(n) counts from 0 up to n-1.",
        "range(start, end) sets a start value.",
        "The end value is always excluded.",
      ],
      quiz: [
        {
          q: "What numbers does range(3) produce?",
          options: ["1,2,3", "0,1,2", "0,1,2,3", "3"],
          answer: 1,
          explanation: "range(3) yields 0, 1, 2 — the end is excluded.",
        },
        {
          q: "What does range(2, 5) produce?",
          options: ["2,3,4", "2,3,4,5", "0,1,2", "2,5"],
          answer: 0,
          explanation: "It counts from 2 up to but not including 5.",
        },
      ],
    },
    {
      lessonId: "l_05_03",
      title: "The while Loop",
      time: "5 min",
      content:
        "A while loop repeats as long as its condition stays True. You must change something inside the loop so it eventually stops.",
      code: "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
      keys: [
        "while repeats while a condition is True.",
        "Update the condition inside the loop.",
        "Forgetting to update creates an infinite loop.",
      ],
      quiz: [
        {
          q: "When does a while loop stop?",
          options: [
            "After 10 runs",
            "When its condition becomes False",
            "Never",
            "Immediately",
          ],
          answer: 1,
          explanation: "It keeps looping until the condition is False.",
        },
      ],
    },
    {
      lessonId: "l_05_04",
      title: "break",
      time: "4 min",
      content:
        "break immediately exits the loop, even if the condition is still True. It's useful for stopping early once you've found what you need.",
      code: "for n in range(10):\n    if n == 3:\n        break\n    print(n)  # 0 1 2",
      keys: [
        "break exits the loop entirely.",
        "Execution continues after the loop.",
        "Handy for early exits.",
      ],
      quiz: [
        {
          q: "What does break do?",
          options: [
            "Skips one iteration",
            "Exits the loop immediately",
            "Restarts the loop",
            "Pauses the loop",
          ],
          answer: 1,
          explanation: "break stops the loop and moves past it.",
        },
      ],
    },
    {
      lessonId: "l_05_05",
      title: "continue",
      time: "4 min",
      content:
        "continue skips the rest of the current iteration and jumps to the next one. The loop keeps going.",
      code: "for n in range(5):\n    if n % 2 == 0:\n        continue\n    print(n)  # 1 3",
      keys: [
        "continue skips to the next iteration.",
        "Code after continue is skipped that round.",
        "The loop itself keeps running.",
      ],
      quiz: [
        {
          q: "What does continue do?",
          options: [
            "Exits the loop",
            "Skips to the next iteration",
            "Ends the program",
            "Repeats the last item",
          ],
          answer: 1,
          explanation:
            "continue jumps to the next loop iteration, skipping the rest.",
        },
      ],
    },
    {
      lessonId: "l_05_06",
      title: "Looping Over a List",
      time: "4 min",
      content:
        "for loops shine when processing lists. Each iteration gives you one item to work with.",
      code: "fruits = ['apple', 'pear']\nfor fruit in fruits:\n    print(fruit)",
      keys: [
        "for x in list iterates over items.",
        "No index needed to read each value.",
        "Clear and readable for collections.",
      ],
      quiz: [
        {
          q: "In `for x in [1,2,3]`, what is x on the second run?",
          options: ["1", "2", "3", "0"],
          answer: 1,
          explanation: "The loop variable takes each value in order: 1, then 2.",
        },
      ],
    },
    {
      lessonId: "l_05_07",
      title: "enumerate()",
      time: "5 min",
      content:
        "enumerate() gives you both the index and the item while looping — handy when you need positions.",
      code: "for i, item in enumerate(['a', 'b']):\n    print(i, item)\n# 0 a\n# 1 b",
      keys: [
        "enumerate() yields (index, item) pairs.",
        "Cleaner than tracking a counter yourself.",
        "Index starts at 0 by default.",
      ],
      quiz: [
        {
          q: "What does enumerate() provide?",
          options: [
            "Only items",
            "Only indexes",
            "Both index and item",
            "Random numbers",
          ],
          answer: 2,
          explanation: "enumerate() pairs each item with its index.",
        },
      ],
    },
    {
      lessonId: "l_05_08",
      title: "Nested Loops",
      time: "5 min",
      content:
        "A loop inside another loop lets you work with grids and combinations. The inner loop completes fully for each pass of the outer loop.",
      code: "for i in range(2):\n    for j in range(2):\n        print(i, j)",
      keys: [
        "Loops can be nested.",
        "Inner loop runs fully each outer pass.",
        "Common for grids and tables.",
      ],
      quiz: [
        {
          q: "How many times does the inner body run in two nested range(3) loops?",
          options: ["3", "6", "9", "1"],
          answer: 2,
          explanation: "3 outer x 3 inner = 9 total iterations.",
        },
      ],
    },
    {
      lessonId: "l_05_09",
      title: "Loop else",
      time: "4 min",
      content:
        "A loop can have an else block that runs only if the loop finished without hitting a break. It's useful for search patterns.",
      code: "for n in [1, 2, 3]:\n    if n == 5:\n        break\nelse:\n    print('not found')",
      keys: [
        "Loop else runs if no break occurred.",
        "Skipped if the loop breaks early.",
        "Useful for 'search failed' logic.",
      ],
      quiz: [
        {
          q: "When does a loop's else run?",
          options: [
            "Always",
            "Only if the loop hit break",
            "Only if the loop finished without break",
            "Never",
          ],
          answer: 2,
          explanation: "The else runs when the loop completes without breaking.",
        },
      ],
    },
    {
      lessonId: "l_05_10",
      title: "Accumulator Pattern",
      time: "5 min",
      content:
        "A common loop pattern builds up a result in a variable, like summing numbers. Start with an initial value and update it each pass.",
      code: "total = 0\nfor n in [1, 2, 3, 4]:\n    total += n\nprint(total)  # 10",
      keys: [
        "Initialise an accumulator before the loop.",
        "Update it inside each iteration.",
        "Common for sums, counts, and building lists.",
      ],
      quiz: [
        {
          q: "What is the accumulator pattern used for?",
          options: [
            "Building up a running result",
            "Deleting variables",
            "Stopping loops",
            "Printing only",
          ],
          answer: 0,
          explanation:
            "It accumulates a result (like a sum) across loop iterations.",
        },
        {
          q: "What should you do before the loop starts?",
          options: [
            "Nothing",
            "Initialise the accumulator variable",
            "Print the result",
            "Break",
          ],
          answer: 1,
          explanation: "Set the accumulator to a starting value first (e.g. 0).",
        },
      ],
    },
  ],
};
