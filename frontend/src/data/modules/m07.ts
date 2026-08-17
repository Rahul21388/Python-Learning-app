import { Module } from "../types";

export const m07: Module = {
  id: "module_07",
  title: "Tuples & Sets",
  description: "Work with fixed collections and unique-value groups.",
  icon: "layers",
  lessons: [
    {
      lessonId: "l_07_01",
      title: "What is a Tuple?",
      time: "4 min",
      content:
        "A tuple is an ordered collection like a list, but immutable — it can't be changed after creation. Tuples use parentheses.",
      code: "point = (3, 4)\nprint(point[0])  # 3",
      keys: [
        "Tuples use parentheses ( ).",
        "They are ordered but immutable.",
        "Great for fixed groups of values.",
      ],
      quiz: [
        {
          q: "How is a tuple different from a list?",
          options: [
            "It's immutable (can't be changed)",
            "It can't hold numbers",
            "It's always empty",
            "It uses square brackets",
          ],
          answer: 0,
          explanation: "Tuples cannot be modified after they are created.",
        },
      ],
    },
    {
      lessonId: "l_07_02",
      title: "When to Use Tuples",
      time: "4 min",
      content:
        "Use tuples for data that shouldn't change, like coordinates or RGB colours. Their immutability can prevent bugs and they can be used as dictionary keys.",
      code: "color = (255, 0, 0)  # red\n# color[0] = 0  -> error!",
      keys: [
        "Use tuples for fixed, unchanging data.",
        "They can serve as dictionary keys.",
        "Immutability helps prevent accidental edits.",
      ],
      quiz: [
        {
          q: "Which is a good use for a tuple?",
          options: [
            "A to-do list that grows",
            "Fixed coordinates (x, y)",
            "A counter you increment",
            "A shopping cart",
          ],
          answer: 1,
          explanation:
            "Fixed values like coordinates suit an immutable tuple well.",
        },
      ],
    },
    {
      lessonId: "l_07_03",
      title: "Tuple Unpacking",
      time: "5 min",
      content:
        "You can assign a tuple's values to multiple variables at once. This is called unpacking.",
      code: "point = (3, 4)\nx, y = point\nprint(x, y)  # 3 4",
      keys: [
        "Unpacking assigns items to variables.",
        "The count of names must match items.",
        "Also works with lists.",
      ],
      quiz: [
        {
          q: "After `a, b = (1, 2)`, what is b?",
          options: ["1", "2", "(1,2)", "None"],
          answer: 1,
          explanation: "Unpacking assigns 1 to a and 2 to b.",
        },
      ],
    },
    {
      lessonId: "l_07_04",
      title: "Swapping Variables",
      time: "4 min",
      content:
        "Tuple unpacking makes swapping two variables a one-liner in Python — no temporary variable needed.",
      code: "a, b = 1, 2\na, b = b, a\nprint(a, b)  # 2 1",
      keys: [
        "a, b = b, a swaps values.",
        "No temp variable required.",
        "Powered by tuple packing/unpacking.",
      ],
      quiz: [
        {
          q: "What does `a, b = b, a` do?",
          options: [
            "Deletes a and b",
            "Swaps their values",
            "Sets both to 0",
            "Raises an error",
          ],
          answer: 1,
          explanation: "It swaps the values of a and b in one statement.",
        },
      ],
    },
    {
      lessonId: "l_07_05",
      title: "What is a Set?",
      time: "5 min",
      content:
        "A set is an unordered collection of unique items, written with curly braces. Duplicates are automatically removed.",
      code: "nums = {1, 2, 2, 3}\nprint(nums)  # {1, 2, 3}",
      keys: [
        "Sets use curly braces { }.",
        "They store only unique items.",
        "They are unordered.",
      ],
      quiz: [
        {
          q: "What happens to duplicate items in a set?",
          options: [
            "They are kept",
            "They cause an error",
            "They are removed automatically",
            "They are counted twice",
          ],
          answer: 2,
          explanation: "Sets keep only one copy of each value.",
        },
      ],
    },
    {
      lessonId: "l_07_06",
      title: "Creating an Empty Set",
      time: "4 min",
      content:
        "Because {} makes an empty dictionary, you must use set() to create an empty set.",
      code: "s = set()      # empty set\nd = {}         # empty dict!\ns.add(5)",
      keys: [
        "set() makes an empty set.",
        "{} makes an empty dictionary, not a set.",
        ".add() puts an item into a set.",
      ],
      quiz: [
        {
          q: "How do you create an empty set?",
          options: ["{}", "set()", "[]", "()"],
          answer: 1,
          explanation: "{} is an empty dict; use set() for an empty set.",
        },
      ],
    },
    {
      lessonId: "l_07_07",
      title: "Set Operations",
      time: "5 min",
      content:
        "Sets support math-like operations: union (|), intersection (&), and difference (-).",
      code: "a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)  # {2, 3}\nprint(a | b)  # {1, 2, 3, 4}",
      keys: [
        "| = union (all items).",
        "& = intersection (common items).",
        "- = difference (in a, not in b).",
      ],
      quiz: [
        {
          q: "What does {1,2} & {2,3} return?",
          options: ["{1,2,3}", "{2}", "{1,3}", "{ }"],
          answer: 1,
          explanation: "& keeps items common to both sets: {2}.",
        },
        {
          q: "Which operator gives the union of two sets?",
          options: ["&", "|", "-", "^"],
          answer: 1,
          explanation: "| combines all unique items from both sets.",
        },
      ],
    },
    {
      lessonId: "l_07_08",
      title: "Removing Duplicates",
      time: "4 min",
      content:
        "A quick trick: convert a list to a set to drop duplicates, then back to a list if you need order/indexing.",
      code: "items = [1, 1, 2, 3, 3]\nunique = list(set(items))\nprint(unique)  # [1, 2, 3]",
      keys: [
        "set() removes duplicate values.",
        "Wrap in list() to get a list back.",
        "Set order is not guaranteed.",
      ],
      quiz: [
        {
          q: "How can you quickly remove duplicates from a list?",
          options: [
            "list(set(mylist))",
            "mylist.unique()",
            "sort(mylist)",
            "You can't",
          ],
          answer: 0,
          explanation: "Converting to a set drops duplicates; list() restores a list.",
        },
      ],
    },
    {
      lessonId: "l_07_09",
      title: "Membership Testing",
      time: "4 min",
      content:
        "Checking whether an item is in a set is very fast — much faster than scanning a large list.",
      code: "allowed = {'admin', 'user'}\nprint('admin' in allowed)  # True",
      keys: [
        "in tests membership in a set.",
        "Set lookups are very fast.",
        "Ideal for large 'contains?' checks.",
      ],
      quiz: [
        {
          q: "Why use a set for membership checks?",
          options: [
            "It keeps order",
            "Lookups are very fast",
            "It allows duplicates",
            "It uses less code always",
          ],
          answer: 1,
          explanation: "Sets offer very fast membership testing.",
        },
      ],
    },
    {
      lessonId: "l_07_10",
      title: "Modifying Sets",
      time: "4 min",
      content:
        ".add() inserts one item and .discard() removes one without error if it's missing. Sets are mutable even though tuples are not.",
      code: "s = {1, 2}\ns.add(3)      # {1, 2, 3}\ns.discard(1)  # {2, 3}",
      keys: [
        ".add() inserts an item.",
        ".discard() removes safely.",
        "Sets are mutable; tuples are not.",
      ],
      quiz: [
        {
          q: "Which method adds an item to a set?",
          options: [".append()", ".add()", ".insert()", ".push()"],
          answer: 1,
          explanation: "Sets use .add() to insert a single item.",
        },
      ],
    },
  ],
};
