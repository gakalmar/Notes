
# To check & add:

- JS workflow of code reading (rewatch video tutorial)
- Get started with workbook
- ASCI characters and how to reference them
- Data object as a separate section

# Questions:  

### 1

What happens at git push level, when first push is interrupted with a pull? (merge development branch on remote)

### 2

const testThis = (func, limit) => {
    let i = 0;
    while (i < limit){
        console.log(func);                          //Why is parentheses not needed here? console.log(func())
        i++;                                        
    };
};

    //Shouldn't callback functions have this format once they are called within another function?

        function greet(name, callback) {
        console.log(`Hello, ${name}!`);
        callback();
        }

        function sayGoodbye() {
        console.log("Goodbye!");
        }

        greet("Alice", sayGoodbye); // Output: Hello, Alice! \n Goodbye!
