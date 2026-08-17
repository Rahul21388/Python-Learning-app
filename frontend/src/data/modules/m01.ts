import { Module } from "../types";

export const m01: Module = {
  id: "module_01",
  title: "Variables & Data Types",
  description: "Store and label data using variables and Python's core types.",
  icon: "cube",
  lessons: [
    {
      lessonId: "l_01_01",
      title: "What is a Variable?",
      time: "4 min",
      content:
        "A variable is a name that refers to a value stored in memory. You create one with the = sign. The name goes on the left, the value on the right.",
      code: "age = 25\nname = 'Ada'\nprint(name, age)",
      keys: [
        "= assigns a value to a variable name.",
        "The name is a label for the stored value.",
        "You can reuse and update variables.",
      ],
      quiz: [
        {
          q: "Which symbol assigns a value to a variable?",
          options: ["==", "=>", "=", ":="],
          answer: 2,
          explanation: "A single = assigns the right-hand value to the name.",
        },
        {
          q: "In `x = 5`, what is x?",
          options: ["A value", "A variable", "A function", "A comment"],
          answer: 1,
          explanation: "x is a variable holding the value 5.",
        },
      ],
    },
    {
      lessonId: "l_01_02",
      title: "Integers",
      time: "4 min",
      content:
        "Integers (int) are whole numbers with no decimal point, positive or negative. Python can handle very large integers without special handling.",
      code: "count = 42\ntemperature = -7\nprint(count + temperature)  # 35",
      keys: [
        "int values are whole numbers.",
        "They can be positive, negative or zero.",
        "Python handles very large integers automatically.",
      ],
      quiz: [
        {
          q: "Which of these is an integer?",
          options: ["3.14", "'7'", "42", "True"],
          answer: 2,
          explanation: "42 is a whole number with no decimal point.",
        },
      ],
    },
    {
      lessonId: "l_01_03",
      title: "Floats",
      time: "4 min",
      content:
        "Floats (float) are numbers with a decimal point, used for fractional values like prices or measurements.",
      code: "price = 9.99\npi = 3.14159\nprint(price * 2)  # 19.98",
      keys: [
        "float values have a decimal point.",
        "Use them for fractions and measurements.",
        "Mixing int and float gives a float.",
      ],
      quiz: [
        {
          q: "Which value is a float?",
          options: ["10", "'10'", "10.0", "True"],
          answer: 2,
          explanation: "10.0 has a decimal point, making it a float.",
        },
        {
          q: "What is the type of 5 + 2.0?",
          options: ["int", "float", "str", "bool"],
          answer: 1,
          explanation: "Mixing an int and a float produces a float.",
        },
      ],
    },
    {
      lessonId: "l_01_04",
      title: "Strings",
      time: "5 min",
      content:
        "Strings (str) hold text and are wrapped in single or double quotes. You can join them with the + operator.",
      code: "first = 'Grace'\nlast = 'Hopper'\nprint(first + ' ' + last)  # Grace Hopper",
      keys: [
        "str values hold text in quotes.",
        "Single and double quotes both work.",
        "+ joins (concatenates) strings.",
      ],
      quiz: [
        {
          q: "How do you write a string?",
          options: [
            "Wrap text in quotes",
            "Add a # before it",
            "Use square brackets",
            "Put = around it",
          ],
          answer: 0,
          explanation: "Strings are text wrapped in single or double quotes.",
        },
        {
          q: "What does 'a' + 'b' produce?",
          options: ["ab", "a b", "a+b", "An error"],
          answer: 0,
          explanation: "+ concatenates strings, giving 'ab'.",
        },
      ],
    },
    {
      lessonId: "l_01_05",
      title: "Booleans",
      time: "4 min",
      content:
        "Booleans (bool) have exactly two values: True and False. They are the foundation of decision-making in code. Note the capital first letter.",
      code: "is_active = True\nis_admin = False\nprint(is_active)  # True",
      keys: [
        "bool has only True or False.",
        "Capitalize the first letter.",
        "Booleans drive if-statements and logic.",
      ],
      quiz: [
        {
          q: "Which are the only two boolean values?",
          options: ["Yes / No", "1 / 0", "True / False", "On / Off"],
          answer: 2,
          explanation: "Python booleans are exactly True and False.",
        },
        {
          q: "Which is written correctly?",
          options: ["true", "TRUE", "True", "tru"],
          answer: 2,
          explanation: "Python booleans are capitalized: True and False.",
        },
      ],
    },
    {
      lessonId: "l_01_06",
      title: "Checking Types with type()",
      time: "4 min",
      content:
        "The built-in type() function tells you the data type of any value. It's a handy tool for debugging.",
      code: "print(type(5))       # <class 'int'>\nprint(type('hi'))    # <class 'str'>\nprint(type(3.0))     # <class 'float'>",
      keys: [
        "type() reveals a value's data type.",
        "Useful for debugging unexpected behaviour.",
        "Returns things like int, str, float, bool.",
      ],
      quiz: [
        {
          q: "What does type('hi') return?",
          options: ["int", "str", "bool", "float"],
          answer: 1,
          explanation: "'hi' is text, so its type is str.",
        },
      ],
    },
    {
      lessonId: "l_01_07",
      title: "Type Conversion",
      time: "5 min",
      content:
        "You can convert between types using int(), float(), and str(). This is essential when combining numbers and text or reading user input.",
      code: "age = int('25')      # string to int\ntext = str(25)       # int to string\nprint(age + 1)       # 26",
      keys: [
        "int(), float(), str() convert between types.",
        "input() always returns a string.",
        "Convert before doing math on text.",
      ],
      quiz: [
        {
          q: "What does int('7') give you?",
          options: ["'7'", "7", "7.0", "An error"],
          answer: 1,
          explanation: "int() converts the string '7' to the integer 7.",
        },
        {
          q: "How do you turn the number 5 into text?",
          options: ["str(5)", "text(5)", "int(5)", "5.str"],
          answer: 0,
          explanation: "str(5) converts the integer to the string '5'.",
        },
      ],
    },
    {
      lessonId: "l_01_08",
      title: "Variable Naming Rules",
      time: "5 min",
      content:
        "Variable names can contain letters, numbers and underscores, but can't start with a number or use spaces. Use descriptive snake_case names for readability.",
      code: "user_name = 'Sam'   # good\ntotal2 = 10         # ok\n# 2total = 10       # error!",
      keys: [
        "Names can't start with a number.",
        "No spaces — use underscores (snake_case).",
        "Descriptive names make code readable.",
      ],
      quiz: [
        {
          q: "Which is a valid variable name?",
          options: ["2score", "my score", "user_age", "class-name"],
          answer: 2,
          explanation:
            "user_age uses letters and an underscore and doesn't start with a number.",
        },
        {
          q: "What naming style does Python prefer for variables?",
          options: ["camelCase", "snake_case", "PascalCase", "kebab-case"],
          answer: 1,
          explanation: "PEP 8 recommends snake_case for variable names.",
        },
      ],
    },
    {
      lessonId: "l_01_09",
      title: "Reading User Input",
      time: "5 min",
      content:
        "input() pauses the program and lets the user type something. Whatever they type comes back as a string, so convert it if you need a number.",
      code: "name = input('Your name? ')\nprint('Hi', name)",
      keys: [
        "input() reads text from the user.",
        "It always returns a string.",
        "Convert with int()/float() for numbers.",
      ],
      quiz: [
        {
          q: "What type does input() return?",
          options: ["int", "float", "str", "bool"],
          answer: 2,
          explanation: "input() always returns the typed value as a string.",
        },
      ],
    },
    {
      lessonId: "l_01_10",
      title: "Constants and None",
      time: "4 min",
      content:
        "Python has no true constants, but by convention names in ALL_CAPS are treated as unchangeable. None is a special value meaning 'no value yet'.",
      code: "MAX_USERS = 100\nresult = None\nprint(result)  # None",
      keys: [
        "ALL_CAPS signals an intended constant.",
        "None represents the absence of a value.",
        "None is its own type (NoneType).",
      ],
      quiz: [
        {
          q: "What does None represent?",
          options: [
            "The number zero",
            "An empty string",
            "The absence of a value",
            "False",
          ],
          answer: 2,
          explanation: "None is a special value meaning 'nothing here yet'.",
        },
        {
          q: "How do developers signal a constant in Python?",
          options: [
            "Using ALL_CAPS names",
            "The const keyword",
            "A # symbol",
            "Curly braces",
          ],
          answer: 0,
          explanation:
            "Python has no const keyword; ALL_CAPS is the convention for constants.",
        },
      ],
    },
  ],
};
