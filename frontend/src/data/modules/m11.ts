import { Module } from "../types";

export const m11: Module = {
  id: "module_11",
  title: "Files & Error Handling",
  description: "Read and write files, and handle errors gracefully.",
  icon: "document-text",
  lessons: [
    {
      lessonId: "l_11_01",
      title: "Opening a File",
      time: "5 min",
      content:
        "open() opens a file and returns a file object. The mode argument controls reading ('r'), writing ('w'), or appending ('a').",
      code: "f = open('notes.txt', 'r')\ncontent = f.read()\nf.close()",
      keys: [
        "open(path, mode) opens a file.",
        "'r' read, 'w' write, 'a' append.",
        "Always close files when done.",
      ],
      quiz: [
        {
          q: "What mode opens a file for reading?",
          options: ["'w'", "'a'", "'r'", "'x'"],
          answer: 2,
          explanation: "'r' means read mode.",
        },
      ],
    },
    {
      lessonId: "l_11_02",
      title: "The with Statement",
      time: "5 min",
      content:
        "Using with open(...) as f automatically closes the file when the block ends — even if an error occurs. It's the recommended way.",
      code: "with open('notes.txt') as f:\n    print(f.read())\n# file is closed automatically here",
      keys: [
        "with auto-closes the file.",
        "Safer than manual open/close.",
        "The preferred pattern for files.",
      ],
      quiz: [
        {
          q: "What is the benefit of `with open(...)`?",
          options: [
            "It runs faster",
            "It closes the file automatically",
            "It creates the file",
            "It reads twice",
          ],
          answer: 1,
          explanation: "with ensures the file is closed even if errors occur.",
        },
      ],
    },
    {
      lessonId: "l_11_03",
      title: "Reading File Content",
      time: "5 min",
      content:
        ".read() returns the whole file as one string, .readlines() returns a list of lines, and looping over the file reads line by line.",
      code: "with open('data.txt') as f:\n    for line in f:\n        print(line.strip())",
      keys: [
        ".read() gets the whole file.",
        ".readlines() returns a list of lines.",
        "Looping the file reads one line at a time.",
      ],
      quiz: [
        {
          q: "What does .read() return?",
          options: [
            "A list of lines",
            "The whole file as a string",
            "One character",
            "A number",
          ],
          answer: 1,
          explanation: ".read() returns the entire file contents as one string.",
        },
      ],
    },
    {
      lessonId: "l_11_04",
      title: "Writing to a File",
      time: "5 min",
      content:
        "Opening in 'w' mode creates or overwrites a file. Use .write() to add text. 'a' mode appends without erasing.",
      code: "with open('out.txt', 'w') as f:\n    f.write('Hello\\n')",
      keys: [
        "'w' creates/overwrites the file.",
        ".write() adds text (add \\n for newlines).",
        "'a' appends to the end instead.",
      ],
      quiz: [
        {
          q: "What does opening in 'w' mode do to an existing file?",
          options: [
            "Appends to it",
            "Overwrites its contents",
            "Reads it",
            "Deletes it entirely",
          ],
          answer: 1,
          explanation: "'w' mode overwrites the file's existing contents.",
        },
      ],
    },
    {
      lessonId: "l_11_05",
      title: "What is an Exception?",
      time: "4 min",
      content:
        "An exception is an error that happens while a program runs, like dividing by zero. If unhandled, it stops the program.",
      code: "print(1 / 0)\n# ZeroDivisionError: division by zero",
      keys: [
        "Exceptions are runtime errors.",
        "Unhandled ones crash the program.",
        "Each has a type, like ZeroDivisionError.",
      ],
      quiz: [
        {
          q: "What happens if an exception is not handled?",
          options: [
            "Nothing",
            "The program stops with an error",
            "It's ignored",
            "It returns None",
          ],
          answer: 1,
          explanation: "Unhandled exceptions terminate the program.",
        },
      ],
    },
    {
      lessonId: "l_11_06",
      title: "try / except",
      time: "5 min",
      content:
        "Wrap risky code in try, and handle failures in except. This keeps your program running instead of crashing.",
      code: "try:\n    x = 1 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
      keys: [
        "try holds code that might fail.",
        "except handles the error.",
        "Prevents crashes on expected errors.",
      ],
      quiz: [
        {
          q: "Where does the risky code go?",
          options: [
            "In the except block",
            "In the try block",
            "In a comment",
            "In finally only",
          ],
          answer: 1,
          explanation: "Code that might raise an error goes in the try block.",
        },
        {
          q: "What runs if the try block raises the matching error?",
          options: [
            "The except block",
            "Nothing",
            "The try again",
            "The whole file restarts",
          ],
          answer: 0,
          explanation: "The matching except block handles the error.",
        },
      ],
    },
    {
      lessonId: "l_11_07",
      title: "Catching Specific Errors",
      time: "5 min",
      content:
        "You can have multiple except blocks for different error types, handling each appropriately.",
      code: "try:\n    n = int('abc')\nexcept ValueError:\n    print('Not a number')\nexcept TypeError:\n    print('Wrong type')",
      keys: [
        "Handle different errors separately.",
        "Match the specific exception type.",
        "Avoid a bare except that hides bugs.",
      ],
      quiz: [
        {
          q: "What error does int('abc') raise?",
          options: ["TypeError", "ValueError", "KeyError", "IndexError"],
          answer: 1,
          explanation: "Converting non-numeric text raises ValueError.",
        },
      ],
    },
    {
      lessonId: "l_11_08",
      title: "finally",
      time: "4 min",
      content:
        "A finally block runs no matter what — whether or not an error occurred. It's used for cleanup like closing resources.",
      code: "try:\n    risky()\nfinally:\n    print('Always runs')",
      keys: [
        "finally always runs.",
        "Runs whether or not an error occurred.",
        "Used for cleanup steps.",
      ],
      quiz: [
        {
          q: "When does a finally block run?",
          options: [
            "Only on success",
            "Only on error",
            "Always",
            "Never",
          ],
          answer: 2,
          explanation: "finally runs regardless of success or failure.",
        },
      ],
    },
    {
      lessonId: "l_11_09",
      title: "Raising Exceptions",
      time: "5 min",
      content:
        "You can raise your own exception with raise to signal that something is wrong, often to enforce rules.",
      code: "def set_age(a):\n    if a < 0:\n        raise ValueError('Age cannot be negative')",
      keys: [
        "raise triggers an exception yourself.",
        "Use it to enforce rules/validation.",
        "Pass a helpful message.",
      ],
      quiz: [
        {
          q: "What does the raise keyword do?",
          options: [
            "Catches an error",
            "Triggers an exception",
            "Ignores an error",
            "Ends a loop",
          ],
          answer: 1,
          explanation: "raise deliberately triggers an exception.",
        },
      ],
    },
    {
      lessonId: "l_11_10",
      title: "Working with JSON",
      time: "5 min",
      content:
        "The json module converts between Python objects and JSON text — essential for saving data and talking to web APIs.",
      code: "import json\ntext = json.dumps({'a': 1})   # to JSON string\ndata = json.loads(text)       # back to dict",
      keys: [
        "json.dumps() -> Python to JSON string.",
        "json.loads() -> JSON string to Python.",
        "JSON is a common data exchange format.",
      ],
      quiz: [
        {
          q: "What does json.loads() do?",
          options: [
            "Converts a dict to JSON text",
            "Converts JSON text to a Python object",
            "Loads a file",
            "Deletes data",
          ],
          answer: 1,
          explanation: "json.loads parses JSON text into Python objects.",
        },
        {
          q: "What does json.dumps() produce?",
          options: [
            "A Python dict",
            "A JSON string",
            "A file",
            "A list",
          ],
          answer: 1,
          explanation: "json.dumps serialises a Python object to a JSON string.",
        },
      ],
    },
  ],
};
