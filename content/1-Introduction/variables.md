# Variables

## Create File
In your node projects folder, create a new file called ```variables.js``` and place the following contents in the file:  
  
```JavaScript
// variables.js

// A constant does not change.
const prefix = "Hello from ";

// A variable does change.
let message = "JavaScript";

// Lets concatenate or join the two messages together &
// print them to the console.
console.log(prefix + message);
```

## Run File
In your terminal, change directories to the location of the file and run the file with the node command:  
  
```
node variables
```

## Output
The output in your terminal should be:
```
Hello from JavaScript
```

## Explanation
When assigning a variable, ask yourself first if the value will be changing.  
If it is changing you would want to use ```let```.  
If it will not be changing, it is a constant and you would want to use ```const```.