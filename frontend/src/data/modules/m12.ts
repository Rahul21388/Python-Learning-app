import { Module } from "../types";

export const m12: Module = {
  id: "module_12",
  title: "Object-Oriented Python",
  description: "Model real-world things with classes, objects and inheritance.",
  icon: "school",
  lessons: [
    {
      lessonId: "l_12_01",
      title: "Classes & Objects",
      time: "5 min",
      content:
        "A class is a blueprint for creating objects. An object is a specific instance built from that blueprint, bundling data and behaviour together.",
      code: "class Dog:\n    pass\n\nrex = Dog()  # rex is an object",
      keys: [
        "A class is a blueprint.",
        "An object is an instance of a class.",
        "OOP bundles data and behaviour.",
      ],
      quiz: [
        {
          q: "What is an object?",
          options: [
            "A blueprint",
            "An instance of a class",
            "A function",
            "A module",
          ],
          answer: 1,
          explanation: "An object is a specific instance created from a class.",
        },
      ],
    },
    {
      lessonId: "l_12_02",
      title: "The __init__ Method",
      time: "5 min",
      content:
        "__init__ is a special method that runs when you create an object. It sets up the object's initial data (attributes).",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nrex = Dog('Rex')\nprint(rex.name)  # Rex",
      keys: [
        "__init__ runs on object creation.",
        "It sets up initial attributes.",
        "It's often called the constructor.",
      ],
      quiz: [
        {
          q: "When does __init__ run?",
          options: [
            "When the class is defined",
            "When an object is created",
            "Never automatically",
            "When the program ends",
          ],
          answer: 1,
          explanation: "__init__ runs automatically each time you create an object.",
        },
      ],
    },
    {
      lessonId: "l_12_03",
      title: "The self Parameter",
      time: "5 min",
      content:
        "self refers to the specific object a method is working on. It's the first parameter of instance methods and how you access the object's own data.",
      code: "class Counter:\n    def __init__(self):\n        self.n = 0\n    def bump(self):\n        self.n += 1",
      keys: [
        "self is the current object.",
        "It's the first parameter of methods.",
        "Use self.x to access attributes.",
      ],
      quiz: [
        {
          q: "What does self refer to?",
          options: [
            "The class name",
            "The current object instance",
            "A global variable",
            "A module",
          ],
          answer: 1,
          explanation: "self refers to the particular object the method acts on.",
        },
      ],
    },
    {
      lessonId: "l_12_04",
      title: "Attributes",
      time: "4 min",
      content:
        "Attributes are variables that belong to an object. You read and set them using dot notation.",
      code: "rex = Dog('Rex')\nprint(rex.name)   # read\nrex.name = 'Max'  # set",
      keys: [
        "Attributes are an object's data.",
        "Access them with dot notation.",
        "Each object has its own attribute values.",
      ],
      quiz: [
        {
          q: "How do you access an object's attribute?",
          options: [
            "obj->name",
            "obj.name",
            "obj[name]",
            "name(obj)",
          ],
          answer: 1,
          explanation: "Dot notation, like obj.name, accesses attributes.",
        },
      ],
    },
    {
      lessonId: "l_12_05",
      title: "Methods",
      time: "5 min",
      content:
        "Methods are functions defined inside a class that act on its objects. You call them with dot notation.",
      code: "class Dog:\n    def speak(self):\n        return 'Woof'\n\nprint(Dog().speak())  # Woof",
      keys: [
        "Methods are functions inside a class.",
        "They take self as the first parameter.",
        "Call them with object.method().",
      ],
      quiz: [
        {
          q: "What is a method?",
          options: [
            "A variable",
            "A function defined inside a class",
            "A module",
            "A loop",
          ],
          answer: 1,
          explanation: "A method is a function that belongs to a class.",
        },
      ],
    },
    {
      lessonId: "l_12_06",
      title: "The __str__ Method",
      time: "5 min",
      content:
        "Defining __str__ controls how your object looks when printed, giving a friendly, readable representation.",
      code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def __str__(self):\n        return f'Dog({self.name})'\n\nprint(Dog('Rex'))  # Dog(Rex)",
      keys: [
        "__str__ defines the printable form.",
        "Called by print() and str().",
        "Makes objects human-readable.",
      ],
      quiz: [
        {
          q: "What does __str__ control?",
          options: [
            "How an object is printed",
            "How an object is deleted",
            "The object's size",
            "The class name",
          ],
          answer: 0,
          explanation: "__str__ defines the string shown when printing the object.",
        },
      ],
    },
    {
      lessonId: "l_12_07",
      title: "Inheritance",
      time: "5 min",
      content:
        "A class can inherit from another, gaining its attributes and methods. The new (child) class can add or change behaviour.",
      code: "class Animal:\n    def eat(self): print('eating')\n\nclass Dog(Animal):\n    def bark(self): print('woof')\n\nDog().eat()  # inherited",
      keys: [
        "A child class inherits from a parent.",
        "It gains the parent's methods/attributes.",
        "It can add its own behaviour too.",
      ],
      quiz: [
        {
          q: "What does a child class inherit?",
          options: [
            "Nothing",
            "The parent's attributes and methods",
            "Only the name",
            "Only errors",
          ],
          answer: 1,
          explanation: "Inheritance passes the parent's methods and attributes down.",
        },
      ],
    },
    {
      lessonId: "l_12_08",
      title: "Overriding Methods",
      time: "5 min",
      content:
        "A child class can redefine a parent's method to change its behaviour. This is called overriding.",
      code: "class Animal:\n    def speak(self): return '...'\n\nclass Cat(Animal):\n    def speak(self): return 'Meow'\n\nprint(Cat().speak())  # Meow",
      keys: [
        "Overriding replaces a parent method.",
        "Same method name, new behaviour.",
        "The child's version is used.",
      ],
      quiz: [
        {
          q: "What is method overriding?",
          options: [
            "Deleting a method",
            "Redefining a parent's method in a child",
            "Calling a method twice",
            "Renaming a class",
          ],
          answer: 1,
          explanation:
            "A child class redefines an inherited method to change it.",
        },
      ],
    },
    {
      lessonId: "l_12_09",
      title: "The super() Function",
      time: "5 min",
      content:
        "super() lets a child class call a method from its parent, often used inside __init__ to reuse setup logic.",
      code: "class Dog(Animal):\n    def __init__(self, name):\n        super().__init__()\n        self.name = name",
      keys: [
        "super() calls the parent's version.",
        "Common inside overridden __init__.",
        "Reuses parent logic instead of copying it.",
      ],
      quiz: [
        {
          q: "What does super() do?",
          options: [
            "Creates a new class",
            "Calls a method from the parent class",
            "Deletes the parent",
            "Ends the program",
          ],
          answer: 1,
          explanation: "super() accesses methods from the parent class.",
        },
      ],
    },
    {
      lessonId: "l_12_10",
      title: "Bringing It Together",
      time: "6 min",
      content:
        "OOP helps you model real things: a BankAccount class bundles a balance with deposit and withdraw methods. You've now covered Python's core foundations — congratulations!",
      code: "class BankAccount:\n    def __init__(self):\n        self.balance = 0\n    def deposit(self, amt):\n        self.balance += amt",
      keys: [
        "Classes model real-world things.",
        "They bundle data with related actions.",
        "You've completed the Python foundations!",
      ],
      quiz: [
        {
          q: "Why is OOP useful?",
          options: [
            "It bundles data with the actions on it",
            "It makes code slower",
            "It removes functions",
            "It's required for every program",
          ],
          answer: 0,
          explanation:
            "OOP groups data and related behaviour into clean, reusable objects.",
        },
        {
          q: "In the BankAccount, what does deposit() change?",
          options: [
            "self.balance",
            "The class name",
            "Nothing",
            "A global variable",
          ],
          answer: 0,
          explanation: "deposit() increases the object's balance attribute.",
        },
      ],
    },
  ],
};
