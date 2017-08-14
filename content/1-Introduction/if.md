# If/Else

## Create File
In your node projects folder, create a new file called ```if.js``` and place the following contents in the file:  
  
```JavaScript
// if.js

let name = "Emilio";  // Let the variable name equal the String, Emilio

if(name === "Emilio"){                       // If the name variable is equal to the String, Emilio
	console.log("The name is Emilio.");      // Print "The name is Emilio" to the console
} else {                                     // Else, if the name variable is not equal to the String, Emilio
	console.log("The name is not Emilio.");  // Print "The name is Emilio" to the console
}
```

## Run File
In your terminal, change directories to the location of the file and run the file with the node command:  
  
```
node if
```

## Output
The output in your terminal should be:
```
console.log("The name is Emilio.");
```

## Explanation
```if(condition){ ...code... } else { ...code... }``` can be used to test a condition and run the appropriate code accordingly.