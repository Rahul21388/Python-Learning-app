import { Module } from "../types";

export const m08: Module = {
  id: "module_08",
  title: "Dictionaries",
  description: "Store data as key-value pairs for fast, labelled lookups.",
  icon: "book",
  lessons: [
    {
      lessonId: "l_08_01",
      title: "What is a Dictionary?",
      time: "5 min",
      content:
        "A dictionary stores data as key-value pairs inside curly braces. Each key maps to a value, like a real dictionary maps words to definitions.",
      code: "person = {'name': 'Ada', 'age': 36}\nprint(person['name'])  # Ada",
      keys: [
        "Dictionaries hold key-value pairs.",
        "Written as {key: value}.",
        "Access values by their key.",
      ],
      quiz: [
        {
          q: "How do you access a dictionary value?",
          options: [
            "By index number",
            "By its key",
            "With .get(0)",
            "You can't",
          ],
          answer: 1,
          explanation: "You look up values using their key, e.g. d['name'].",
        },
      ],
    },
    {
      lessonId: "l_08_02",
      title: "Adding & Updating",
      time: "4 min",
      content:
        "Assign to a key to add it (if new) or update it (if it exists).",
      code: "d = {'a': 1}\nd['b'] = 2   # add\nd['a'] = 99  # update\nprint(d)     # {'a': 99, 'b': 2}",
      keys: [
        "d[key] = value adds or updates.",
        "New keys are created automatically.",
        "Existing keys are overwritten.",
      ],
      quiz: [
        {
          q: "What does d['x'] = 5 do if 'x' doesn't exist?",
          options: [
            "Raises an error",
            "Adds a new key 'x'",
            "Does nothing",
            "Deletes the dict",
          ],
          answer: 1,
          explanation: "Assigning to a missing key creates it.",
        },
      ],
    },
    {
      lessonId: "l_08_03",
      title: "Safe Access with get()",
      time: "5 min",
      content:
        "Accessing a missing key with [] raises an error. .get(key) returns None (or a default you provide) instead.",
      code: "d = {'a': 1}\nprint(d.get('b'))        # None\nprint(d.get('b', 0))     # 0",
      keys: [
        ".get() avoids KeyError for missing keys.",
        "Returns None if the key is absent.",
        "Pass a second argument as a default.",
      ],
      quiz: [
        {
          q: "What does d.get('missing') return if the key isn't there?",
          options: ["An error", "None", "0", "''"],
          answer: 1,
          explanation: ".get() returns None (or your default) for missing keys.",
        },
      ],
    },
    {
      lessonId: "l_08_04",
      title: "Removing Keys",
      time: "4 min",
      content:
        "del d[key] removes a pair, and .pop(key) removes it and returns its value.",
      code: "d = {'a': 1, 'b': 2}\ndel d['a']\nval = d.pop('b')  # val=2, d={}",
      keys: [
        "del d[key] deletes a pair.",
        ".pop(key) deletes and returns the value.",
        "Removing a missing key errors.",
      ],
      quiz: [
        {
          q: "What does d.pop('x') return?",
          options: [
            "Nothing",
            "The value stored at 'x'",
            "The key 'x'",
            "True",
          ],
          answer: 1,
          explanation: ".pop() removes the key and returns its value.",
        },
      ],
    },
    {
      lessonId: "l_08_05",
      title: "Looping Over a Dictionary",
      time: "5 min",
      content:
        ".items() gives key-value pairs, .keys() gives keys, and .values() gives values — all handy in for loops.",
      code: "d = {'a': 1, 'b': 2}\nfor key, value in d.items():\n    print(key, value)",
      keys: [
        ".items() yields (key, value) pairs.",
        ".keys() and .values() give each side.",
        "Looping a dict directly iterates its keys.",
      ],
      quiz: [
        {
          q: "What does .items() give you in a loop?",
          options: [
            "Only keys",
            "Only values",
            "Key-value pairs",
            "Indexes",
          ],
          answer: 2,
          explanation: ".items() yields each (key, value) pair.",
        },
      ],
    },
    {
      lessonId: "l_08_06",
      title: "Checking for Keys",
      time: "4 min",
      content:
        "Use the in operator to check whether a key exists before using it.",
      code: "d = {'a': 1}\nprint('a' in d)  # True\nprint('z' in d)  # False",
      keys: [
        "in checks for a key (not a value).",
        "Returns a boolean.",
        "Prevents KeyError surprises.",
      ],
      quiz: [
        {
          q: "For d = {'a': 1}, what does 'a' in d return?",
          options: ["True", "False", "1", "Error"],
          answer: 0,
          explanation: "'a' is a key in d, so it returns True.",
        },
      ],
    },
    {
      lessonId: "l_08_07",
      title: "Counting with Dictionaries",
      time: "5 min",
      content:
        "Dictionaries are perfect for tallying. Use .get(key, 0) + 1 to count occurrences.",
      code: "counts = {}\nfor ch in 'aab':\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)  # {'a': 2, 'b': 1}",
      keys: [
        "Dicts are great for counting/tallying.",
        ".get(key, 0) gives a safe starting count.",
        "Increment then store back.",
      ],
      quiz: [
        {
          q: "Why use .get(key, 0) when counting?",
          options: [
            "To avoid an error on the first count",
            "To sort the keys",
            "To delete keys",
            "It's required syntax",
          ],
          answer: 0,
          explanation:
            "It supplies a default of 0 the first time a key is seen.",
        },
      ],
    },
    {
      lessonId: "l_08_08",
      title: "Nested Dictionaries",
      time: "5 min",
      content:
        "Values can themselves be dictionaries, letting you model structured data like records.",
      code: "users = {\n  'ada': {'age': 36, 'admin': True}\n}\nprint(users['ada']['age'])  # 36",
      keys: [
        "Dict values can be dicts (or lists).",
        "Chain keys to reach nested data.",
        "Great for structured records.",
      ],
      quiz: [
        {
          q: "How do you read a value in a nested dict?",
          options: [
            "Chain the keys: d['a']['b']",
            "Use a single key",
            "You can't nest dicts",
            "Use an index",
          ],
          answer: 0,
          explanation: "Chain keys to drill into nested dictionaries.",
        },
      ],
    },
    {
      lessonId: "l_08_09",
      title: "Dictionary Comprehensions",
      time: "5 min",
      content:
        "Like list comprehensions, you can build dictionaries in one line: {key: value for item in sequence}.",
      code: "squares = {n: n*n for n in range(4)}\nprint(squares)  # {0:0, 1:1, 2:4, 3:9}",
      keys: [
        "Form: {k: v for item in sequence}.",
        "Builds a dict concisely.",
        "Can include an if filter.",
      ],
      quiz: [
        {
          q: "What does {x: x*2 for x in [1,2]} produce?",
          options: [
            "{1:2, 2:4}",
            "[2, 4]",
            "{1,2}",
            "{2:1, 4:2}",
          ],
          answer: 0,
          explanation: "Each key maps to double its value: {1:2, 2:4}.",
        },
      ],
    },
    {
      lessonId: "l_08_10",
      title: "Merging Dictionaries",
      time: "4 min",
      content:
        "In Python 3.9+, the | operator merges two dictionaries into a new one. Later keys win on conflict.",
      code: "a = {'x': 1}\nb = {'y': 2}\nprint(a | b)  # {'x': 1, 'y': 2}",
      keys: [
        "| merges two dicts (Python 3.9+).",
        "On conflict, the right side wins.",
        ".update() merges in place.",
      ],
      quiz: [
        {
          q: "When two dicts share a key during merge, which value is kept?",
          options: [
            "The left one",
            "The right one",
            "Both",
            "Neither",
          ],
          answer: 1,
          explanation: "The right-hand dict's value overwrites on conflict.",
        },
      ],
    },
  ],
};
