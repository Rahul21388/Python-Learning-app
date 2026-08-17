import { Module } from "../types";

export const m06: Module = {
  id: "module_06",
  title: "Lists",
  description: "Store ordered collections and transform them with ease.",
  icon: "list",
  lessons: [
    {
      lessonId: "l_06_01",
      title: "Creating Lists",
      time: "4 min",
      content:
        "A list is an ordered collection written in square brackets, with items separated by commas. Lists can hold any mix of types.",
      code: "nums = [1, 2, 3]\nmixed = ['a', 1, True]\nempty = []",
      keys: [
        "Lists use square brackets [ ].",
        "Items are comma-separated and ordered.",
        "A list can mix different types.",
      ],
      quiz: [
        {
          q: "Which brackets define a list?",
          options: ["( )", "{ }", "[ ]", "< >"],
          answer: 2,
          explanation: "Lists are written with square brackets.",
        },
      ],
    },
    {
      lessonId: "l_06_02",
      title: "Accessing Items",
      time: "4 min",
      content:
        "Like strings, lists are indexed from 0. Use square brackets to read an item, and negative indexes for the end.",
      code: "colors = ['red', 'green', 'blue']\nprint(colors[0])   # red\nprint(colors[-1])  # blue",
      keys: [
        "Indexing starts at 0.",
        "list[-1] is the last item.",
        "Out-of-range indexes cause an error.",
      ],
      quiz: [
        {
          q: "For [10, 20, 30], what is index 1?",
          options: ["10", "20", "30", "1"],
          answer: 1,
          explanation: "Index 1 is the second item, 20.",
        },
      ],
    },
    {
      lessonId: "l_06_03",
      title: "Changing Items",
      time: "4 min",
      content:
        "Lists are mutable, meaning you can change items in place by assigning to an index.",
      code: "nums = [1, 2, 3]\nnums[0] = 99\nprint(nums)  # [99, 2, 3]",
      keys: [
        "Lists are mutable (changeable).",
        "Assign to an index to replace an item.",
        "Strings, by contrast, are immutable.",
      ],
      quiz: [
        {
          q: "Are lists mutable?",
          options: [
            "Yes, you can change them",
            "No, they are fixed",
            "Only if empty",
            "Only numbers",
          ],
          answer: 0,
          explanation: "Lists can be changed in place after creation.",
        },
      ],
    },
    {
      lessonId: "l_06_04",
      title: "Adding Items",
      time: "5 min",
      content:
        ".append() adds one item to the end, and .insert(index, item) adds at a specific position.",
      code: "nums = [1, 2]\nnums.append(3)      # [1, 2, 3]\nnums.insert(0, 0)   # [0, 1, 2, 3]",
      keys: [
        ".append() adds to the end.",
        ".insert(i, x) adds at position i.",
        "Both change the list in place.",
      ],
      quiz: [
        {
          q: "What does .append() do?",
          options: [
            "Adds an item to the end",
            "Removes the last item",
            "Sorts the list",
            "Adds to the front",
          ],
          answer: 0,
          explanation: ".append() adds a single item to the end of the list.",
        },
      ],
    },
    {
      lessonId: "l_06_05",
      title: "Removing Items",
      time: "5 min",
      content:
        ".remove(value) deletes the first matching value, .pop() removes and returns the last item, and del removes by index.",
      code: "nums = [1, 2, 3]\nnums.remove(2)  # [1, 3]\nlast = nums.pop()  # last=3, nums=[1]",
      keys: [
        ".remove(value) deletes by value.",
        ".pop() removes and returns an item.",
        "del removes by index.",
      ],
      quiz: [
        {
          q: "What does .pop() return?",
          options: [
            "Nothing",
            "The removed item",
            "The list length",
            "True",
          ],
          answer: 1,
          explanation: ".pop() removes the last item and returns it.",
        },
      ],
    },
    {
      lessonId: "l_06_06",
      title: "List Slicing",
      time: "5 min",
      content:
        "Just like strings, lists support [start:end] slicing to grab a sublist. The result is a new list.",
      code: "nums = [0, 1, 2, 3, 4]\nprint(nums[1:3])  # [1, 2]\nprint(nums[:2])   # [0, 1]",
      keys: [
        "[start:end] returns a sublist.",
        "The end index is excluded.",
        "Slicing produces a new list.",
      ],
      quiz: [
        {
          q: "For [0,1,2,3], what does [1:3] give?",
          options: ["[1,2,3]", "[1,2]", "[0,1]", "[2,3]"],
          answer: 1,
          explanation: "Indexes 1 and 2 are included; 3 is excluded.",
        },
      ],
    },
    {
      lessonId: "l_06_07",
      title: "Sorting Lists",
      time: "5 min",
      content:
        ".sort() sorts a list in place, while sorted() returns a new sorted list. Add reverse=True for descending order.",
      code: "nums = [3, 1, 2]\nnums.sort()          # [1, 2, 3]\nprint(sorted([3,1,2], reverse=True))  # [3,2,1]",
      keys: [
        ".sort() changes the list in place.",
        "sorted() returns a new sorted list.",
        "reverse=True sorts descending.",
      ],
      quiz: [
        {
          q: "What's the difference between .sort() and sorted()?",
          options: [
            ".sort() changes in place; sorted() returns a new list",
            "They are identical",
            "sorted() only works on numbers",
            ".sort() returns a copy",
          ],
          answer: 0,
          explanation:
            ".sort() mutates the list; sorted() leaves it and returns a new list.",
        },
      ],
    },
    {
      lessonId: "l_06_08",
      title: "Useful List Functions",
      time: "4 min",
      content:
        "len() counts items, sum() adds numbers, and min()/max() find extremes.",
      code: "nums = [4, 1, 7]\nprint(len(nums))  # 3\nprint(sum(nums))  # 12\nprint(max(nums))  # 7",
      keys: [
        "len() counts items.",
        "sum() adds numeric items.",
        "min() and max() find smallest/largest.",
      ],
      quiz: [
        {
          q: "What does sum([1, 2, 3]) return?",
          options: ["3", "6", "123", "Error"],
          answer: 1,
          explanation: "sum adds the numbers: 1+2+3 = 6.",
        },
      ],
    },
    {
      lessonId: "l_06_09",
      title: "List Comprehensions",
      time: "5 min",
      content:
        "A comprehension builds a new list in one readable line: [expression for item in sequence]. You can add a condition too.",
      code: "squares = [n * n for n in range(4)]\nprint(squares)  # [0, 1, 4, 9]",
      keys: [
        "Form: [expr for item in sequence].",
        "Optionally add 'if condition'.",
        "Concise alternative to a for loop.",
      ],
      quiz: [
        {
          q: "What does [x*2 for x in [1,2,3]] produce?",
          options: ["[1,2,3]", "[2,4,6]", "[1,4,9]", "[2,3,4]"],
          answer: 1,
          explanation: "Each item is doubled: [2, 4, 6].",
        },
        {
          q: "How do you filter items in a comprehension?",
          options: [
            "Add an if clause",
            "Add a while clause",
            "Use break",
            "You can't",
          ],
          answer: 0,
          explanation: "An 'if condition' at the end filters which items are kept.",
        },
      ],
    },
    {
      lessonId: "l_06_10",
      title: "Copying Lists",
      time: "5 min",
      content:
        "Assigning one list to another name shares the same list — changes affect both. Use .copy() or [:] to make an independent copy.",
      code: "a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)  # [1, 2] (unchanged)",
      keys: [
        "b = a shares the same list object.",
        ".copy() or [:] makes a separate copy.",
        "Beware accidental shared references.",
      ],
      quiz: [
        {
          q: "How do you make an independent copy of a list?",
          options: [
            "b = a",
            "b = a.copy()",
            "b == a",
            "copy a",
          ],
          answer: 1,
          explanation: ".copy() (or a[:]) creates a new, independent list.",
        },
      ],
    },
  ],
};
