const ReactNativeQuestions=[
    {
        id:1,
      question:'Which of these React native components will be used to display the name="React Native Tutorial"?',
      option1:'View',
      option2:'Text',
      option3:'span',
      option4:'p',
      answer:'Text'
    },
    {
        id:2,
        question:'Which of the following components is the optimized way to show a long list of data?',
        option1:'View',
        option2:'Scrollview',
        option3:'Safeareaview',
        option4:'Flatlist',
        answer:'Flatlist'
      },
      {
        id:3,
        question:'How do you style your React Native component?',
        option1:'Stylesheet.create',
        option2:'Stylesheet.css',
        option3:'Safeareaview',
        option4:'Flatlist',
        answer:'Stylesheet.create'
      },
      {
        id:4,
        question:'Which of the following is the correct plugin to navigate from one screen to another?',
        option1:'React Hooks',
        option2:'React Navigation',
        option3:'React Router',
        option4:'Screen',
        answer:'React Navigation'
      },
      {
        id:5,
        question:'Which of the following is the correct method(hook) to make an api call on page load?',
        option1:'useState',
        option2:'useEffect',
        option3:'useReducer',
        option4:'useSelector',
        answer:'useEffect'
      },
      {
        id:6,
        question:"Which of the following is used to make sure that your input fields don't hide behind the keyboard?",
        option1:'Keyboardavoidingview',
        option2:'Keyboardview',
        option3:'View',
        option4:'Scrollview',
        answer:'Keyboardavoidingview'
      },
      {
        id:7,
        question:" What is the use case of ActivityIndicator in React Native?",
        option1:'To display a circular loading activity',
        option2:'To display a progress bar activity',
        option3:'To open the app',
        option4:'To exit the app',
        answer:'To display a circular loading activity'
      },
      {
        id:8,
        question:" How do we detect platforms in React Native?",
        option1:'Platform.OS',
        option2:'Phone.OS',
        option3:'Dimension.OS',
        option4:'RN.OS',
        answer:'Platform.OS'
      },
      {
        id:9,
        question:"Which of the following is the correct way to store data in a local device?",
        option1:'Asyncstorage',
        option2:'Localstorage',
        option3:'Sessionstorage',
        option4:'RNStorage',
        answer:'Asyncstorage'
      },
      {
        id:10,
        question:"Which of the following comes under dangerous permission in Android?",
        option1:'Read SMS',
        option2:'Ask Location',
        option3:'Show notification',
        option4:'Internet access',
        answer:'Read SMS'
      },

  ]

  const JavaQuestions = [
    {
      id: 1,
      question: "Which of the following is not a Java keyword?",
      option1: "class",
      option2: "interface",
      option3: "extends",
      option4: "include",
      answer: "include"
    },
    {
      id: 2,
      question: "Which method is the entry point of a Java program?",
      option1: "start()",
      option2: "run()",
      option3: "main()",
      option4: "init()",
      answer: "main()"
    },
    {
      id: 3,
      question: "What is the default value of a boolean in Java?",
      option1: "true",
      option2: "false",
      option3: "0",
      option4: "null",
      answer: "false"
    },
    {
      id: 4,
      question: "Which exception is thrown when a negative array size is declared?",
      option1: "NullPointerException",
      option2: "NegativeArraySizeException",
      option3: "ArrayIndexOutOfBoundsException",
      option4: "ArithmeticException",
      answer: "NegativeArraySizeException"
    },
    {
      id: 5,
      question: "Which of these is not a wrapper class?",
      option1: "Integer",
      option2: "Float",
      option3: "Character",
      option4: "String",
      answer: "String"
    },
    {
      id: 6,
      question: "What does the 'static' keyword mean in Java?",
      option1: "Method can only be called once",
      option2: "Method belongs to the class rather than instance",
      option3: "Method is hidden",
      option4: "Method can’t return any value",
      answer: "Method belongs to the class rather than instance"
    },
    {
      id: 7,
      question: "Which package contains the Scanner class?",
      option1: "java.io",
      option2: "java.util",
      option3: "java.net",
      option4: "java.lang",
      answer: "java.util"
    },
    {
      id: 8,
      question: "Which of the following is a valid declaration of a char?",
      option1: "char ch = 'AB';",
      option2: "char ch = 'A';",
      option3: "char ch = A;",
      option4: "char ch = 'abc';",
      answer: "char ch = 'A';"
    },
    {
      id: 9,
      question: "Which of the following is used to create an object in Java?",
      option1: "new",
      option2: "class",
      option3: "malloc",
      option4: "alloc",
      answer: "new"
    },
    {
      id: 10,
      question: "What is the size of an int in Java?",
      option1: "4 bytes",
      option2: "2 bytes",
      option3: "8 bytes",
      option4: "Depends on system",
      answer: "4 bytes"
    }
  ];

  
  const JavaScriptQuestions = [
    {
      id: 1,
      question: "Which of the following is a correct way to declare a variable in JavaScript?",
      option1: "var name = 'John';",
      option2: "int name = 'John';",
      option3: "String name = 'John';",
      option4: "declare name = 'John';",
      answer: "var name = 'John';"
    },
    {
      id: 2,
      question: "Which symbol is used for comments in JavaScript?",
      option1: "// for single-line, /* */ for multi-line",
      option2: "# for single-line, /* */ for multi-line",
      option3: "-- for single-line",
      option4: ";; for single-line",
      answer: "// for single-line, /* */ for multi-line"
    },
    {
      id: 3,
      question: "Which method converts JSON data to a JavaScript object?",
      option1: "JSON.parse()",
      option2: "JSON.stringify()",
      option3: "JSON.toObject()",
      option4: "JSON.convert()",
      answer: "JSON.parse()"
    },
    {
      id: 4,
      question: "Which of the following is NOT a JavaScript data type?",
      option1: "Number",
      option2: "Boolean",
      option3: "Float",
      option4: "String",
      answer: "Float"
    },
    {
      id: 5,
      question: "How do you write a function in JavaScript?",
      option1: "function = myFunc()",
      option2: "function myFunc()",
      option3: "def myFunc()",
      option4: "fun myFunc()",
      answer: "function myFunc()"
    },
    {
      id: 6,
      question: "Which event is used to run code after a button is clicked?",
      option1: "onpress",
      option2: "onclick",
      option3: "onhit",
      option4: "onchange",
      answer: "onclick"
    },
    {
      id: 7,
      question: "What will `typeof null` return in JavaScript?",
      option1: "'null'",
      option2: "'undefined'",
      option3: "'object'",
      option4: "'number'",
      answer: "'object'"
    },
    {
      id: 8,
      question: "Which array method adds one or more elements to the end of an array?",
      option1: "push()",
      option2: "pop()",
      option3: "shift()",
      option4: "unshift()",
      answer: "push()"
    },
    {
      id: 9,
      question: "What is the result of '2' + 2 in JavaScript?",
      option1: "4",
      option2: "22",
      option3: "NaN",
      option4: "Error",
      answer: "22"
    },
    {
      id: 10,
      question: "How do you write an `if` statement in JavaScript?",
      option1: "if i = 5",
      option2: "if (i == 5)",
      option3: "if i == 5 then",
      option4: "if i equals 5",
      answer: "if (i == 5)"
    }
  ];

  const AIQuestions = [
    {
      id: 1,
      question: "Who is considered the father of Artificial Intelligence?",
      option1: "Alan Turing",
      option2: "John McCarthy",
      option3: "Andrew Ng",
      option4: "Geoffrey Hinton",
      answer: "John McCarthy"
    },
    {
      id: 2,
      question: "Which of the following is a subset of AI?",
      option1: "Machine Learning",
      option2: "Web Development",
      option3: "Cloud Computing",
      option4: "Cyber Security",
      answer: "Machine Learning"
    },
    {
      id: 3,
      question: "What is the main goal of Artificial Intelligence?",
      option1: "To build faster computers",
      option2: "To replace the internet",
      option3: "To enable machines to mimic human behavior",
      option4: "To create new programming languages",
      answer: "To enable machines to mimic human behavior"
    },
    {
      id: 4,
      question: "Which of these is an AI application?",
      option1: "Face Recognition",
      option2: "MS Word",
      option3: "Notepad",
      option4: "Calculator",
      answer: "Face Recognition"
    },
    {
      id: 5,
      question: "Which programming language is widely used in AI?",
      option1: "C",
      option2: "JavaScript",
      option3: "Python",
      option4: "PHP",
      answer: "Python"
    },
    {
      id: 6,
      question: "Which algorithm is used for classification problems in AI?",
      option1: "K-Means",
      option2: "Linear Regression",
      option3: "Decision Tree",
      option4: "PCA",
      answer: "Decision Tree"
    },
    {
      id: 7,
      question: "What is the full form of NLP in AI?",
      option1: "New Learning Process",
      option2: "Natural Learning Power",
      option3: "Natural Language Processing",
      option4: "Neural Logic Processor",
      answer: "Natural Language Processing"
    },
    {
      id: 8,
      question: "Which of these is a type of learning in AI?",
      option1: "Subject Learning",
      option2: "Supervised Learning",
      option3: "Systematic Learning",
      option4: "Programmed Learning",
      answer: "Supervised Learning"
    },
    {
      id: 9,
      question: "Which of these is a popular AI library in Python?",
      option1: "NumPy",
      option2: "React",
      option3: "TensorFlow",
      option4: "Laravel",
      answer: "TensorFlow"
    },
    {
      id: 10,
      question: "Which of the following is a neural network framework?",
      option1: "Bootstrap",
      option2: "Express.js",
      option3: "PyTorch",
      option4: "Vue.js",
      answer: "PyTorch"
    }
  ];

  
  const PythonQuestions = [
    {
      id: 1,
      question: "Which of the following is used to define a function in Python?",
      option1: "function",
      option2: "def",
      option3: "fun",
      option4: "define",
      answer: "def"
    },
    {
      id: 2,
      question: "Which of the following is a valid variable name in Python?",
      option1: "2name",
      option2: "name_2",
      option3: "name-2",
      option4: "name.2",
      answer: "name_2"
    },
    {
      id: 3,
      question: "Which keyword is used for loops in Python?",
      option1: "repeat",
      option2: "loop",
      option3: "iterate",
      option4: "for",
      answer: "for"
    },
    {
      id: 4,
      question: "How do you start a comment in Python?",
      option1: "//",
      option2: "/*",
      option3: "#",
      option4: "<!--",
      answer: "#"
    },
    {
      id: 5,
      question: "Which data type is used to store multiple items in a single variable?",
      option1: "int",
      option2: "str",
      option3: "list",
      option4: "bool",
      answer: "list"
    },
    {
      id: 6,
      question: "Which of these is a Python tuple?",
      option1: "[1, 2, 3]",
      option2: "{1, 2, 3}",
      option3: "(1, 2, 3)",
      option4: "<1, 2, 3>",
      answer: "(1, 2, 3)"
    },
    {
      id: 7,
      question: "Which function is used to get the length of a list?",
      option1: "size()",
      option2: "count()",
      option3: "length()",
      option4: "len()",
      answer: "len()"
    },
    {
      id: 8,
      question: "What does `print(type('Hello'))` output?",
      option1: "<class 'str'>",
      option2: "<type 'string'>",
      option3: "str",
      option4: "string",
      answer: "<class 'str'>"
    },
    {
      id: 9,
      question: "How do you install an external package in Python?",
      option1: "python install",
      option2: "install pip",
      option3: "pip install",
      option4: "pkg install",
      answer: "pip install"
    },
    {
      id: 10,
      question: "Which of these is a Python web framework?",
      option1: "React",
      option2: "Flask",
      option3: "Laravel",
      option4: "Spring",
      answer: "Flask"
    }
  ];

  const CppQuestions = [
    {
      id: 1,
      question: "Which of the following is the correct file extension for a C++ file?",
      option1: ".cp",
      option2: ".cplus",
      option3: ".cpp",
      option4: ".cpl",
      answer: ".cpp"
    },
    {
      id: 2,
      question: "Which keyword is used to define a class in C++?",
      option1: "define",
      option2: "struct",
      option3: "class",
      option4: "object",
      answer: "class"
    },
    {
      id: 3,
      question: "Which of the following denotes the entry point of a C++ program?",
      option1: "start()",
      option2: "main()",
      option3: "run()",
      option4: "init()",
      answer: "main()"
    },
    {
      id: 4,
      question: "Which operator is used to access members of a class through an object?",
      option1: ".",
      option2: "->",
      option3: "::",
      option4: "&",
      answer: "."
    },
    {
      id: 5,
      question: "Which of these is a correct way to declare a constant in C++?",
      option1: "int constant x = 10;",
      option2: "constant int x = 10;",
      option3: "const int x = 10;",
      option4: "final int x = 10;",
      answer: "const int x = 10;"
    },
    {
      id: 6,
      question: "What is the output of: `cout << 5 / 2;`?",
      option1: "2.5",
      option2: "3",
      option3: "2",
      option4: "2.0",
      answer: "2"
    },
    {
      id: 7,
      question: "Which of the following is used to create an object in C++?",
      option1: "instance",
      option2: "init",
      option3: "object",
      option4: "new",
      answer: "new"
    },
    {
      id: 8,
      question: "Which concept allows the use of the same function name with different parameters?",
      option1: "Inheritance",
      option2: "Overloading",
      option3: "Abstraction",
      option4: "Encapsulation",
      answer: "Overloading"
    },
    {
      id: 9,
      question: "Which of these is not a loop in C++?",
      option1: "for",
      option2: "while",
      option3: "foreach",
      option4: "do-while",
      answer: "foreach"
    },
    {
      id: 10,
      question: "Which header file is used for input/output in C++?",
      option1: "iostream",
      option2: "inputoutput",
      option3: "stream",
      option4: "stdio",
      answer: "iostream"
    }
  ];
  

  
  export {ReactNativeQuestions,JavaQuestions,JavaScriptQuestions,AIQuestions,PythonQuestions,CppQuestions};