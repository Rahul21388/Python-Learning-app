import { Module } from "../types";

export const m03: Module = {
  id: "module_03",
  title: "Working with Strings",
  description: "Slice, search, format and transform text like a pro.",
  icon: "text",
  lessons: [
    {
      lessonId: "l_03_01",
      title: "String Indexing",
      time: "5 min",
      content:
        "Each character in a string has a position (index) starting at 0. Access a character with square brackets. Negative indexes count from the end.",
      code: "word = 'Python'\nprint(word[0])   # P\nprint(word[-1])  # n",
      keys: [
        "Indexing starts at 0.",
        "word[0] is the first character.",
        "Negative indexes count from the end.",
      ],
      quiz: [
        {
          q: "What is the index of the first character?",
          options: ["1", "0", "-1", "first"],
          answer: 1,
          explanation: "Python indexing starts at 0.",
        },
        {
          q: "For 'cat', what does 'cat'[-1] give?",
          options: ["c", "a", "t", "Error"],
          answer: 2,
          explanation: "-1 is the last character, 't'.",
        },
      ],
    },
    {
      lessonId: "l_03_02",
      title: "String Slicing",
      time: "5 min",
      content:
        "Slicing extracts part of a string using [start:end]. The start is included, the end is excluded.",
      code: "s = 'Python'\nprint(s[0:3])  # Pyt\nprint(s[2:])   # thon",
      keys: [
        "[start:end] slices a substring.",
        "start is included, end is excluded.",
        "Omit a side to go to the beginning/end.",
      ],
      quiz: [
        {
          q: "For 'Python', what does [0:3] return?",
          options: ["Pyth", "Pyt", "yth", "Pytho"],
          answer: 1,
          explanation: "Indexes 0,1,2 are included; index 3 is excluded: 'Pyt'.",
        },
      ],
    },
    {
      lessonId: "l_03_03",
      title: "String Length",
      time: "3 min",
      content:
        "The len() function returns how many characters are in a string (or items in a list).",
      code: "print(len('hello'))  # 5",
      keys: [
        "len() counts characters in a string.",
        "It also counts items in lists.",
        "Spaces count as characters too.",
      ],
      quiz: [
        {
          q: "What does len('code') return?",
          options: ["3", "4", "5", "code"],
          answer: 1,
          explanation: "'code' has 4 characters.",
        },
      ],
    },
    {
      lessonId: "l_03_04",
      title: "Changing Case",
      time: "4 min",
      content:
        "Methods like .upper(), .lower(), and .title() return a new string in a different case. The original string is never changed.",
      code: "print('hi'.upper())     # HI\nprint('HI'.lower())     # hi\nprint('hi there'.title())  # Hi There",
      keys: [
        ".upper() and .lower() change case.",
        ".title() capitalizes each word.",
        "String methods return a NEW string.",
      ],
      quiz: [
        {
          q: "What does 'abc'.upper() return?",
          options: ["abc", "ABC", "Abc", "Error"],
          answer: 1,
          explanation: ".upper() returns an all-uppercase copy.",
        },
        {
          q: "Do string methods change the original string?",
          options: [
            "Yes, always",
            "No, they return a new string",
            "Only .upper() does",
            "Only on numbers",
          ],
          answer: 1,
          explanation: "Strings are immutable; methods return new strings.",
        },
      ],
    },
    {
      lessonId: "l_03_05",
      title: "Stripping Whitespace",
      time: "4 min",
      content:
        ".strip() removes spaces (and newlines) from both ends of a string. Useful for cleaning up user input.",
      code: "raw = '  hello  '\nprint(raw.strip())  # 'hello'",
      keys: [
        ".strip() trims whitespace from both ends.",
        ".lstrip() and .rstrip() trim one side.",
        "Great for cleaning user input.",
      ],
      quiz: [
        {
          q: "What does '  hi  '.strip() return?",
          options: ["'  hi  '", "'hi'", "'hi  '", "'  hi'"],
          answer: 1,
          explanation: ".strip() removes whitespace from both ends.",
        },
      ],
    },
    {
      lessonId: "l_03_06",
      title: "Replacing Text",
      time: "4 min",
      content:
        ".replace(old, new) returns a copy with every occurrence of old swapped for new.",
      code: "s = 'I like cats'\nprint(s.replace('cats', 'dogs'))  # I like dogs",
      keys: [
        ".replace() swaps text.",
        "It replaces every occurrence.",
        "Returns a new string.",
      ],
      quiz: [
        {
          q: "What does 'aaa'.replace('a', 'b') return?",
          options: ["'aaa'", "'bbb'", "'bab'", "'ab'"],
          answer: 1,
          explanation: "Every 'a' is replaced, giving 'bbb'.",
        },
      ],
    },
    {
      lessonId: "l_03_07",
      title: "Splitting Strings",
      time: "5 min",
      content:
        ".split() breaks a string into a list, splitting on spaces by default or on a separator you provide.",
      code: "print('a,b,c'.split(','))   # ['a', 'b', 'c']\nprint('one two'.split())    # ['one', 'two']",
      keys: [
        ".split() turns a string into a list.",
        "Default splits on whitespace.",
        "Pass a separator to split on it.",
      ],
      quiz: [
        {
          q: "What does 'a-b'.split('-') return?",
          options: ["'ab'", "['a', 'b']", "['a-b']", "'a b'"],
          answer: 1,
          explanation: "Splitting on '-' yields the list ['a', 'b'].",
        },
      ],
    },
    {
      lessonId: "l_03_08",
      title: "Joining Strings",
      time: "4 min",
      content:
        "'sep'.join(list) glues a list of strings together with a separator. It's the opposite of split.",
      code: "parts = ['a', 'b', 'c']\nprint('-'.join(parts))  # a-b-c",
      keys: [
        ".join() combines a list into one string.",
        "The separator goes before .join().",
        "It's the inverse of .split().",
      ],
      quiz: [
        {
          q: "What does ' '.join(['hi', 'there']) return?",
          options: ["'hithere'", "'hi there'", "['hi there']", "Error"],
          answer: 1,
          explanation: "Items are joined with a space: 'hi there'.",
        },
      ],
    },
    {
      lessonId: "l_03_09",
      title: "f-strings (Formatting)",
      time: "5 min",
      content:
        "f-strings let you embed variables directly inside text by prefixing the string with f and using {curly braces}. They're the modern, readable way to format.",
      code: "name = 'Ada'\nage = 36\nprint(f'{name} is {age}')  # Ada is 36",
      keys: [
        "Prefix the string with f.",
        "Put variables inside { }.",
        "Cleanest way to build text with data.",
      ],
      quiz: [
        {
          q: "How do you start an f-string?",
          options: [
            "With f before the quote",
            "With a # symbol",
            "With format()",
            "With a $ sign",
          ],
          answer: 0,
          explanation: "An f before the opening quote makes it an f-string.",
        },
        {
          q: "In an f-string, what goes inside { }?",
          options: [
            "Only numbers",
            "Variables or expressions",
            "Comments",
            "Nothing",
          ],
          answer: 1,
          explanation: "Braces can hold variables or expressions to embed.",
        },
      ],
    },
    {
      lessonId: "l_03_10",
      title: "Checking Content",
      time: "5 min",
      content:
        "Methods like .startswith(), .endswith(), and .isdigit() answer True/False questions about a string's content.",
      code: "print('cat.png'.endswith('.png'))  # True\nprint('123'.isdigit())             # True",
      keys: [
        ".startswith()/.endswith() check edges.",
        ".isdigit() checks if all chars are digits.",
        "These return booleans.",
      ],
      quiz: [
        {
          q: "What does '42'.isdigit() return?",
          options: ["True", "False", "42", "Error"],
          answer: 0,
          explanation: "All characters are digits, so True.",
        },
        {
          q: "What does 'hello'.startswith('he') return?",
          options: ["True", "False", "'he'", "Error"],
          answer: 0,
          explanation: "The string does begin with 'he', so True.",
        },
      ],
    },
  ],
};
