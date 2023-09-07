
# Console display

    console.count()                                     //logs and also adds a counter when logged (eg. console.count("x")) => this will log: "x: 1 \nl x: 2... x: 5"
    console.table()                                     //display an array as a table to make it easier to read it in the console
    console.dir()                                       //force JSON format display (use it after .log to compare)
    console.group()                                     //display messages in the console as a group (until group end is called) -> makes it easier to read
    console.groupCollapsed()                            //make sub-group (groupend needed for this one too!)
    console.groupEnd()                                  //end group message display

    console.count()                                     //counts and logs the number a function has been invoked
    console.countReset()
    console.trace()                                     //??
    console.time()                                      //display the time between 2 function calls
    console.timeEnd()

    console.warn();                                     //additional levels of displaying information in the browser's console besides .log
    console.error();
    
# Timeouts

    setTimeout(func, time);                                     //executes a function after a waiting period (eg time = 3000 -> milliseconds, so it will be 3 seconds) -- IT DOESN'T WORK LIKE THIS: setTimeout(console.log("Hello"), 1000)!!!
                                                                //returns intervalID as default, not the finction's value (eg. let intervalID = setTimeout(func, 3000)) -> console.log(intervalID) -> 3
                                                                //execute a funcX every Y seconds, by nesting into itself: const funcX = () => {console.log("Hello"); setTimeout(funcX, Y*1000)};
    setTimeout(func[,0]);                                       //this is used to execute the func right after the previous one is completed (that's why there is a differenc between nested setTimeout and setInterval time intervals)
    setInterval(func, time);                                    //this is better for running a function every Y seconds, but not as flexible (the other one can be modified for the next execution). 
                                                                //Intervals for nested execution start after the first func is executed, while setinterval method timer starts at the beginning of the func execution
    clearTimeout(intervalID);                                   //with a function calling itself again and again, you can stop it after some time with this function