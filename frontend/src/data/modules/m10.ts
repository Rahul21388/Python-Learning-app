import { Module } from "../types";

export const m10: Module = {
  id: "module_10",
  title: "Modules & Packages",
  description: "Reuse code from the standard library and the wider ecosystem.",
  icon: "cube-outline",
  lessons: [
    {
      lessonId: "l_10_01",
      title: "What is a Module?",
      time: "4 min",
      content:
        "A module is a Python file full of reusable code. The import statement lets you use code from other modules in your program.",
      code: "import math\nprint(math.sqrt(16))  # 4.0",
      keys: [
        "A module is a .py file of reusable code.",
        "import brings its code into your program.",
        "Access items with module.name.",
      ],
      quiz: [
        {
          q: "What does import do?",
          options: [
            "Deletes a module",
            "Brings a module's code into your program",
            "Runs the terminal",
            "Creates a variable",
          ],
          answer: 1,
          explanation: "import makes another module's code available to use.",
        },
      ],
    },
    {
      lessonId: "l_10_02",
      title: "Importing Specific Names",
      time: "5 min",
      content:
        "from module import name imports just one item, so you can use it without the module prefix.",
      code: "from math import sqrt\nprint(sqrt(25))  # 5.0",
      keys: [
        "from x import y imports a single name.",
        "Use it directly without the prefix.",
        "Keeps calls short and clear.",
      ],
      quiz: [
        {
          q: "After `from math import sqrt`, how do you call it?",
          options: ["math.sqrt(9)", "sqrt(9)", "import sqrt(9)", "math(9)"],
          answer: 1,
          explanation: "It's imported directly, so call sqrt(9) with no prefix.",
        },
      ],
    },
    {
      lessonId: "l_10_03",
      title: "Aliasing with as",
      time: "4 min",
      content:
        "Use as to give an import a shorter nickname, a common convention for popular libraries.",
      code: "import datetime as dt\nnow = dt.datetime.now()",
      keys: [
        "as creates an alias for an import.",
        "Shortens long module names.",
        "e.g. import numpy as np.",
      ],
      quiz: [
        {
          q: "What does `import numpy as np` let you write?",
          options: ["numpy.array()", "np.array()", "array()", "as.array()"],
          answer: 1,
          explanation: "The alias np replaces numpy in your code.",
        },
      ],
    },
    {
      lessonId: "l_10_04",
      title: "The math Module",
      time: "5 min",
      content:
        "The math module offers functions like sqrt, floor, ceil, and constants like pi.",
      code: "import math\nprint(math.pi)       # 3.14159...\nprint(math.ceil(4.1))  # 5",
      keys: [
        "math has common math functions.",
        "math.pi is a useful constant.",
        "ceil rounds up; floor rounds down.",
      ],
      quiz: [
        {
          q: "What does math.ceil(4.1) return?",
          options: ["4", "5", "4.1", "4.0"],
          answer: 1,
          explanation: "ceil rounds up to the next whole number, 5.",
        },
      ],
    },
    {
      lessonId: "l_10_05",
      title: "The random Module",
      time: "5 min",
      content:
        "random generates random numbers and choices — great for games and sampling.",
      code: "import random\nprint(random.randint(1, 6))       # dice roll\nprint(random.choice(['a', 'b']))  # random pick",
      keys: [
        "random.randint(a, b) gives a random int.",
        "random.choice() picks from a sequence.",
        "Perfect for games and simulations.",
      ],
      quiz: [
        {
          q: "What does random.choice(['x','y']) do?",
          options: [
            "Always returns 'x'",
            "Picks one item at random",
            "Sorts the list",
            "Returns both",
          ],
          answer: 1,
          explanation: "random.choice returns a randomly selected element.",
        },
      ],
    },
    {
      lessonId: "l_10_06",
      title: "The datetime Module",
      time: "5 min",
      content:
        "datetime works with dates and times. datetime.now() returns the current date and time.",
      code: "from datetime import datetime\nnow = datetime.now()\nprint(now.year)",
      keys: [
        "datetime handles dates and times.",
        "datetime.now() gives the current moment.",
        "Access parts like .year, .month, .day.",
      ],
      quiz: [
        {
          q: "What does datetime.now() return?",
          options: [
            "Only the year",
            "The current date and time",
            "A random date",
            "A string 'now'",
          ],
          answer: 1,
          explanation: "It returns the current date and time as a datetime object.",
        },
      ],
    },
    {
      lessonId: "l_10_07",
      title: "The Standard Library",
      time: "4 min",
      content:
        "Python ships with a huge standard library — modules for JSON, files, math, dates, web requests and more — all available without installing anything.",
      code: "import json\ndata = json.dumps({'a': 1})\nprint(data)  # {\"a\": 1}",
      keys: [
        "The standard library comes built-in.",
        "Covers JSON, files, math, dates and more.",
        "No installation needed.",
      ],
      quiz: [
        {
          q: "Do standard library modules need to be installed?",
          options: [
            "Yes, always",
            "No, they ship with Python",
            "Only on Windows",
            "Only math does",
          ],
          answer: 1,
          explanation: "Standard library modules are included with Python.",
        },
      ],
    },
    {
      lessonId: "l_10_08",
      title: "Installing Packages with pip",
      time: "5 min",
      content:
        "pip installs third-party packages from PyPI (the Python Package Index) that aren't in the standard library.",
      code: "pip install requests",
      keys: [
        "pip installs external packages.",
        "Packages come from PyPI.",
        "e.g. pip install requests.",
      ],
      quiz: [
        {
          q: "What is pip used for?",
          options: [
            "Running Python files",
            "Installing third-party packages",
            "Printing output",
            "Deleting modules",
          ],
          answer: 1,
          explanation: "pip installs packages from the Python Package Index.",
        },
      ],
    },
    {
      lessonId: "l_10_09",
      title: "Virtual Environments",
      time: "5 min",
      content:
        "A virtual environment keeps a project's packages isolated from other projects, preventing version conflicts.",
      code: "python -m venv env\n# then activate it before installing packages",
      keys: [
        "venv isolates project dependencies.",
        "Prevents version conflicts between projects.",
        "Create with python -m venv name.",
      ],
      quiz: [
        {
          q: "Why use a virtual environment?",
          options: [
            "To isolate a project's packages",
            "To make code run faster",
            "To connect to the internet",
            "It's required for all code",
          ],
          answer: 0,
          explanation:
            "Virtual environments keep each project's dependencies separate.",
        },
      ],
    },
    {
      lessonId: "l_10_10",
      title: "Creating Your Own Module",
      time: "5 min",
      content:
        "Any .py file you write can be imported by another file in the same folder — that's your own module.",
      code: "# helpers.py\ndef greet(): print('hi')\n\n# main.py\nimport helpers\nhelpers.greet()",
      keys: [
        "Your own .py files are importable modules.",
        "Import by filename (without .py).",
        "Encourages organised, reusable code.",
      ],
      quiz: [
        {
          q: "How do you import your file helpers.py?",
          options: [
            "import helpers",
            "import helpers.py",
            "include helpers",
            "use helpers",
          ],
          answer: 0,
          explanation: "Import by module name without the .py extension.",
        },
      ],
    },
  ],
};
