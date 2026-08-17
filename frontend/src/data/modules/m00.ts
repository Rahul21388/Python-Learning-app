import { Module } from "../types";

export const m00: Module = {
  id: "module_00",
  title: "Getting Started",
  description: "Understand what programming is and run your very first Python code.",
  icon: "rocket",
  lessons: [
    {
      lessonId: "l_00_01",
      title: "What is Programming?",
      time: "4 min",
      content:
        "Programming is the act of giving a computer a precise set of instructions to follow. A program is just a list of steps written in a language the computer can understand. Python is one of the most popular, beginner-friendly languages because its syntax reads almost like plain English.",
      keys: [
        "A program is a sequence of instructions.",
        "Computers do exactly what you tell them — no more, no less.",
        "Python is known for readable, English-like syntax.",
      ],
      quiz: [
        {
          q: "What is a program?",
          options: [
            "A physical part of the computer",
            "A set of instructions for the computer to follow",
            "A type of monitor",
            "An internet connection",
          ],
          answer: 1,
          explanation:
            "A program is simply an ordered list of instructions that the computer executes.",
        },
        {
          q: "Why is Python popular with beginners?",
          options: [
            "It has readable, English-like syntax",
            "It only works on phones",
            "It has no rules",
            "It cannot make mistakes",
          ],
          answer: 0,
          explanation:
            "Python's clean, readable syntax makes it easier to learn than many other languages.",
        },
      ],
    },
    {
      lessonId: "l_00_02",
      title: "Installing Python",
      time: "5 min",
      content:
        "To run Python on your own machine you install it from python.org. On macOS and Linux a version is often pre-installed. You can confirm your installation by opening a terminal and checking the version number.",
      code: "python --version\n# Python 3.12.0",
      keys: [
        "Download Python from python.org.",
        "Check the install with `python --version`.",
        "Use Python 3, not the old Python 2.",
      ],
      quiz: [
        {
          q: "Which command checks your Python version?",
          options: ["python --version", "python run", "get python", "py.check"],
          answer: 0,
          explanation:
            "`python --version` prints the currently installed version number.",
        },
        {
          q: "Which major version should you learn today?",
          options: ["Python 1", "Python 2", "Python 3", "Python X"],
          answer: 2,
          explanation: "Python 3 is the current, supported version.",
        },
      ],
    },
    {
      lessonId: "l_00_03",
      title: "Your First Program",
      time: "4 min",
      content:
        "The classic first program prints a greeting to the screen. The print() function displays text. Text values (strings) are wrapped in quotes.",
      code: 'print("Hello, World!")',
      keys: [
        "print() displays output on the screen.",
        "Strings are wrapped in single or double quotes.",
        "Every beginner starts with Hello, World!",
      ],
      quiz: [
        {
          q: "Which function displays text on screen?",
          options: ["show()", "display()", "print()", "echo()"],
          answer: 2,
          explanation: "print() is Python's built-in function for output.",
        },
        {
          q: 'What does print("Hi") output?',
          options: ['"Hi"', "Hi", "print Hi", "Nothing"],
          answer: 1,
          explanation:
            "The quotes are part of the syntax; only the text Hi is shown.",
        },
      ],
    },
    {
      lessonId: "l_00_04",
      title: "The Python Shell (REPL)",
      time: "4 min",
      content:
        "The REPL (Read-Eval-Print Loop) lets you type Python one line at a time and instantly see results. It's perfect for experimenting. Type `python` in your terminal to start it.",
      code: ">>> 2 + 3\n5\n>>> print('hi')\nhi",
      keys: [
        "REPL stands for Read-Eval-Print Loop.",
        "It runs code instantly, line by line.",
        "Great for quick experiments and testing ideas.",
      ],
      quiz: [
        {
          q: "What does REPL stand for?",
          options: [
            "Read-Eval-Print Loop",
            "Run-Every-Python-Line",
            "Read-Enter-Print-List",
            "Repeat-Print Loop",
          ],
          answer: 0,
          explanation: "Read, Evaluate, Print, Loop — repeated for each line.",
        },
      ],
    },
    {
      lessonId: "l_00_05",
      title: "Comments",
      time: "4 min",
      content:
        "Comments are notes in your code that Python ignores. They explain what code does for humans. In Python, anything after a # on a line is a comment.",
      code: "# This is a comment\nprint('Running')  # inline comment",
      keys: [
        "Comments start with #.",
        "Python ignores everything after # on that line.",
        "Use comments to explain the why, not the obvious.",
      ],
      quiz: [
        {
          q: "Which symbol starts a comment in Python?",
          options: ["//", "#", "<!--", "--"],
          answer: 1,
          explanation: "Python uses # for single-line comments.",
        },
        {
          q: "What does Python do with comments?",
          options: [
            "Runs them as code",
            "Prints them",
            "Ignores them",
            "Turns them into errors",
          ],
          answer: 2,
          explanation: "Comments are ignored by the interpreter.",
        },
      ],
    },
    {
      lessonId: "l_00_06",
      title: "Running a Script File",
      time: "5 min",
      content:
        "For real programs you save code in a file ending in .py and run it from the terminal. This lets you keep and re-run your work.",
      code: "# save as hello.py, then run:\npython hello.py",
      keys: [
        "Python files end with .py.",
        "Run a file with `python filename.py`.",
        "Scripts let you save and reuse code.",
      ],
      quiz: [
        {
          q: "What file extension do Python scripts use?",
          options: [".python", ".py", ".pt", ".pyt"],
          answer: 1,
          explanation: "Python source files use the .py extension.",
        },
      ],
    },
    {
      lessonId: "l_00_07",
      title: "Indentation Matters",
      time: "5 min",
      content:
        "Unlike many languages, Python uses indentation (spaces at the start of a line) to define blocks of code. Consistent indentation is required, not optional. The standard is 4 spaces.",
      code: "if True:\n    print('indented')  # 4 spaces = inside the block",
      keys: [
        "Indentation defines code blocks in Python.",
        "The convention is 4 spaces per level.",
        "Inconsistent indentation causes errors.",
      ],
      quiz: [
        {
          q: "What does Python use to define code blocks?",
          options: ["Curly braces {}", "Indentation", "Semicolons", "Parentheses"],
          answer: 1,
          explanation:
            "Python relies on indentation instead of braces to group code.",
        },
        {
          q: "How many spaces per indent level is conventional?",
          options: ["1", "2", "4", "8"],
          answer: 2,
          explanation: "PEP 8 recommends 4 spaces per indentation level.",
        },
      ],
    },
    {
      lessonId: "l_00_08",
      title: "Errors Are Normal",
      time: "4 min",
      content:
        "Everyone makes mistakes, and Python tells you about them with error messages called tracebacks. Reading the last line of a traceback usually tells you what went wrong.",
      code: "print(hello)\n# NameError: name 'hello' is not defined",
      keys: [
        "Error messages are called tracebacks.",
        "Read the last line first — it names the error.",
        "Errors are helpful clues, not failures.",
      ],
      quiz: [
        {
          q: "What is a Python error report called?",
          options: ["A log", "A traceback", "A warning box", "A crash file"],
          answer: 1,
          explanation:
            "Python prints a traceback showing where and why the error happened.",
        },
      ],
    },
    {
      lessonId: "l_00_09",
      title: "Using an Editor / IDE",
      time: "4 min",
      content:
        "A code editor like VS Code gives you syntax highlighting, error checks, and easy file management. It makes writing larger programs far more comfortable than a plain text editor.",
      keys: [
        "An IDE/editor helps you write code faster.",
        "VS Code is a popular free choice.",
        "Features: highlighting, autocomplete, error hints.",
      ],
      quiz: [
        {
          q: "What does a code editor's syntax highlighting do?",
          options: [
            "Runs your code",
            "Colours code to make it readable",
            "Deletes errors automatically",
            "Connects to the internet",
          ],
          answer: 1,
          explanation:
            "Highlighting colours keywords, strings and more to aid readability.",
        },
      ],
    },
    {
      lessonId: "l_00_10",
      title: "How Python Runs Code",
      time: "5 min",
      content:
        "Python is an interpreted language. The interpreter reads your code top to bottom and executes each line in order. You don't need a separate compile step like some languages.",
      keys: [
        "Python is interpreted, not compiled by you.",
        "Code runs top to bottom, line by line.",
        "No manual compile step is required.",
      ],
      quiz: [
        {
          q: "How does Python execute your code?",
          options: [
            "Randomly",
            "Bottom to top",
            "Top to bottom, line by line",
            "All at once with no order",
          ],
          answer: 2,
          explanation:
            "The interpreter runs statements in order from top to bottom.",
        },
        {
          q: "Python is best described as what kind of language?",
          options: ["Interpreted", "Assembly", "Machine", "Markup"],
          answer: 0,
          explanation: "Python code is run by an interpreter.",
        },
      ],
    },
  ],
};
