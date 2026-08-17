import { Module } from "../types";

export const m09: Module = {
  id: "module_09",
  title: "Functions",
  description: "Package reusable logic into clean, callable functions.",
  icon: "cog",
  lessons: [
    {
      lessonId: "l_09_01",
      title: "Defining a Function",
      time: "5 min",
      content:
        "Use def to define a function, followed by its name, parentheses, and a colon. The indented body runs when you call the function.",
      code: "def greet():\n    print('Hello!')\n\ngreet()  # Hello!",
      keys: [
        "def defines a function.",
        "Call it with its name and ().",
        "The body is indented.",
      ],
      quiz: [
        {
          q: "Which keyword defines a function?",
          options: ["func", "def", "function", "define"],
          answer: 1,
          explanation: "Python uses def to define a function.",
        },
        {
          q: "How do you run a function named run?",
          options: ["run", "run()", "call run", "def run"],
          answer: 1,
          explanation: "Add parentheses to call it: run().",
        },
      ],
    },
    {
      lessonId: "l_09_02",
      title: "Parameters & Arguments",
      time: "5 min",
      content:
        "Parameters are variables listed in the definition; arguments are the actual values you pass in when calling.",
      code: "def greet(name):\n    print('Hi', name)\n\ngreet('Ada')  # Hi Ada",
      keys: [
        "Parameters are named in the definition.",
        "Arguments are the values you pass.",
        "They let functions work on different data.",
      ],
      quiz: [
        {
          q: "In `def f(x)`, what is x?",
          options: ["An argument", "A parameter", "A return value", "A module"],
          answer: 1,
          explanation: "x is a parameter — a placeholder for an argument.",
        },
      ],
    },
    {
      lessonId: "l_09_03",
      title: "Return Values",
      time: "5 min",
      content:
        "return sends a value back to the caller. A function without return gives back None.",
      code: "def add(a, b):\n    return a + b\n\nresult = add(2, 3)  # 5",
      keys: [
        "return hands a value back.",
        "No return means the function returns None.",
        "Code after return does not run.",
      ],
      quiz: [
        {
          q: "What does a function return if it has no return statement?",
          options: ["0", "None", "''", "An error"],
          answer: 1,
          explanation: "Functions without an explicit return give back None.",
        },
        {
          q: "What does add(2,3) return above?",
          options: ["23", "5", "None", "'5'"],
          answer: 1,
          explanation: "It returns the sum, 5.",
        },
      ],
    },
    {
      lessonId: "l_09_04",
      title: "Default Parameters",
      time: "5 min",
      content:
        "Give a parameter a default value so callers can omit it. Defaults are used only when no argument is provided.",
      code: "def greet(name='there'):\n    print('Hi', name)\n\ngreet()        # Hi there\ngreet('Sam')   # Hi Sam",
      keys: [
        "Set defaults with param=value.",
        "Callers may omit defaulted arguments.",
        "Defaulted params come after non-defaulted ones.",
      ],
      quiz: [
        {
          q: "When is a default value used?",
          options: [
            "Always",
            "When no argument is passed for it",
            "Never",
            "Only for numbers",
          ],
          answer: 1,
          explanation: "The default applies only if the caller omits that argument.",
        },
      ],
    },
    {
      lessonId: "l_09_05",
      title: "Keyword Arguments",
      time: "4 min",
      content:
        "You can pass arguments by name for clarity and to skip order. These are called keyword arguments.",
      code: "def rect(w, h):\n    return w * h\n\nprint(rect(h=3, w=4))  # 12",
      keys: [
        "Pass arguments by name: name=value.",
        "Order doesn't matter with keywords.",
        "Improves readability at the call site.",
      ],
      quiz: [
        {
          q: "What is a keyword argument?",
          options: [
            "An argument passed by name",
            "A reserved word",
            "A default value",
            "A return value",
          ],
          answer: 0,
          explanation: "Keyword arguments are passed as name=value.",
        },
      ],
    },
    {
      lessonId: "l_09_06",
      title: "*args",
      time: "5 min",
      content:
        "*args lets a function accept any number of positional arguments, collected into a tuple.",
      code: "def total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3))  # 6",
      keys: [
        "*args collects extra positional args.",
        "Inside the function it's a tuple.",
        "Lets functions take variable input.",
      ],
      quiz: [
        {
          q: "What type is *args inside the function?",
          options: ["A list", "A tuple", "A dict", "A string"],
          answer: 1,
          explanation: "*args gathers positional arguments into a tuple.",
        },
      ],
    },
    {
      lessonId: "l_09_07",
      title: "**kwargs",
      time: "5 min",
      content:
        "**kwargs collects any number of keyword arguments into a dictionary.",
      code: "def show(**info):\n    print(info)\n\nshow(name='Ada', age=36)\n# {'name': 'Ada', 'age': 36}",
      keys: [
        "**kwargs collects extra keyword args.",
        "Inside the function it's a dict.",
        "Keys are the argument names.",
      ],
      quiz: [
        {
          q: "What type is **kwargs inside the function?",
          options: ["A tuple", "A list", "A dict", "A set"],
          answer: 2,
          explanation: "**kwargs gathers keyword arguments into a dictionary.",
        },
      ],
    },
    {
      lessonId: "l_09_08",
      title: "Scope",
      time: "5 min",
      content:
        "Variables created inside a function are local — they don't exist outside it. Variables outside are global and can be read inside.",
      code: "x = 10  # global\ndef f():\n    y = 5  # local\n    print(x, y)\nf()  # 10 5",
      keys: [
        "Local variables live only inside the function.",
        "Global variables can be read inside.",
        "Keep scope small to avoid bugs.",
      ],
      quiz: [
        {
          q: "Where can a local variable be used?",
          options: [
            "Anywhere",
            "Only inside its function",
            "Only globally",
            "In other files",
          ],
          answer: 1,
          explanation: "Local variables exist only within their function.",
        },
      ],
    },
    {
      lessonId: "l_09_09",
      title: "Lambda Functions",
      time: "5 min",
      content:
        "A lambda is a tiny anonymous function written in one line. It's handy for short operations, often passed to other functions.",
      code: "double = lambda x: x * 2\nprint(double(5))  # 10",
      keys: [
        "lambda makes a small anonymous function.",
        "Form: lambda args: expression.",
        "Great for short, throwaway logic.",
      ],
      quiz: [
        {
          q: "What is a lambda?",
          options: [
            "A loop",
            "A small anonymous function",
            "A data type",
            "A module",
          ],
          answer: 1,
          explanation: "A lambda is a compact, unnamed function.",
        },
      ],
    },
    {
      lessonId: "l_09_10",
      title: "Docstrings",
      time: "4 min",
      content:
        "A docstring is a triple-quoted string just under the def line that documents what the function does. Tools and help() can read it.",
      code: "def area(r):\n    \"\"\"Return the area of a circle.\"\"\"\n    return 3.14159 * r * r",
      keys: [
        "Docstrings document a function.",
        "Use triple quotes right after def.",
        "Readable via help() and editors.",
      ],
      quiz: [
        {
          q: "Where does a docstring go?",
          options: [
            "Before the def line",
            "As the first line inside the function",
            "At the end of the file",
            "In a comment only",
          ],
          answer: 1,
          explanation: "The docstring is the first statement inside the function.",
        },
      ],
    },
  ],
};
