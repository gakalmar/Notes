# Questions:  

### 1 SI / Pizza madness / Pizza length

Miert mukodik maskepp a ket loop?

For...of loop:

        const nameLength = (str) => {
            let words = str.split(" ");
            console.log(words);
            for (let word of words){
                word = word + " " + word.length;
            };
            return words;
        };

For loop:

        const nameLength = (str) => {
            let words = str.split(" ");
            for (let i = 0; i < words.length; i++){
                words[i] = words[i] + " " + words[i].length;
            };
            return words;
        };

### 2 SI / The CATastrophy / Where's Mimi

forEach-en belul hogy mukodik a return? (fuggveny a fuggvenyben)

    const searchCat = (arr, missingName) => {
        arr.forEach(cat => {
            if (cat["name"] === missingName){
                return cat;                                     //THIS LINE
            };
        });
        return `${missingName} is not in our shelter.`;
    };

Igy mar mukodik:

    const searchCat = (arr, missingName) => {
        let missingCat;
        arr.forEach(cat => {
            if (cat["name"] === missingName){
                missingCat = cat;
            };
        });
        return (missingCat) ? missingCat : `${missingName} is not in our shelter.`;
    };

### 3 SI / The CATastrophy / Similar cat names:

Listaztam a kozos neveket, es kivettem a duplikaciokat, ABC sorrendben is vannak:

        const similarCatNames = (arr1, arr2) => {
            let popularNames = [];
            arr1.forEach(cat1 => {
                for (let cat2 of arr2){
                    if (cat1.name === cat2.name){
                        if (!popularNames.includes(cat1.name)){
                            popularNames.push(cat1.name);
                        };
                    };
                };
            });
            return popularNames.sort();
        };

Names counted, but not arranged (one object where keys are the names)

        const similarCatNames = (arr1, arr2) => {
            let popularNames = {};
            for (let i = 0; i < arr1.length; i++){
                for (let j = 0; j < arr2.length; j++){
                    if (arr1[i].name === arr2[j].name){
                        if (popularNames[arr1[i].name]){
                            popularNames[arr1[i].name]++;
                        } else{
                            popularNames[arr1[i].name] = 1;
                        }
                    };
                };
            };
            return popularNames.sort((a, b) => a);
        };

### 4 SI / Fake profiles / Task 4: Fake profile generator:

Email generator function used cannot execute .toLowerCase(), unless I create variables for the names: (I can't create the object and fill the data on the go,
and I can't do it line-by line either, unless I create the name variables first)

This is the email generator, that runs into an error if I try to call it without creating variables for the names:

        const emailGenerator = (firstName, lastName) => {
            return firstName.toLowerCase() + "." + lastName.toLowerCase() + "@gmail.com";
        };

This is the fake-profile-object generator (it works like this, but there were extra steps added):

        const profileGenerator = (firstName, arrLastNames, arrJobs, funcRandomFromList, funcPhoneNum, funcEmail) => {
            const obj = {};
            
            let firstNameVar = firstName;
            let lastNameVar = funcRandomFromList(arrLastNames);

            obj.name = {};
            obj.name.first = firstNameVar;
            obj.name.last = lastNameVar;
            obj.job = funcRandomFromList(arrJobs);
            obj.phone = funcPhoneNum();
            obj.email = funcEmail(firstNameVar, lastNameVar);
            return obj;
        };