# Data Types

## Create File
In your node projects folder, create a new file called ```dataTypes.js``` and place the following contents in the file, replacing the name and age with your own:  
  
```JavaScript
// Strings (Words)
let firstName = "Matthew";
let message   = "is learning how to program in Node JS.";

// Integers (Numbers)
let age = 37;

// Boolean (True or False)
let isAlive = true;

// Null (Empty or Without A Current Value)
let fearOfLearning = null;

// Concatenate (Chaining Together To Form One Variable)
let fullMessage = firstName + ", who is " + age + " years old, " + message;

// Print the fullMessage variable to the console
console.log(fullMessage);
```

## Run File
In your terminal, change directories to the location of the file and run the file with the node command:  
  
```
node dataTypes
```

## Output
The output in your terminal should be:
```
(your name), who is (your age) years old, is learning how to program in Node JS.
```

## Explanation
When assigning a variable, ask yourself what data type best suits your needs.