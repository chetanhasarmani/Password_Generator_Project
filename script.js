const inputslider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-length-number]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copymsg = document.querySelector("[data-copymsg]");
const copybtn = document.querySelector("[data-copy]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbercheck = document.querySelector("#number");
const symbolcheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generator = document.querySelector(".generate-btn");
const allcheckbox =document.querySelectorAll("input[type=checkbox]");

let symbol ="'~!@#$%^&*()_-+=?/><{}[]\|"
let password = "";
let passwordLength = 10;
let checkcount =0;


handleslider();



//set password length on UI
function handleslider(){
    inputslider.value = passwordLength ;
    lengthDisplay.innerText = passwordLength ;

    const min = inputslider.min;
    
    const max = inputslider.max;
    
    inputslider.style.backgroundSize = ((passwordLength - min)*100 / (max-min)) + "% 100%";
    
    
}


//set indicator 
setIndicator("#CCC");

function setIndicator(color){

    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 18px 1px ${color}`

}


function getRandomNum(min ,max){
   return Math.floor(Math.random()*(max-min))+min;

}

function generateRandomNumber(){
    return getRandomNum(0,9);
}

function generateLowerCase(){
    return String.fromCharCode( getRandomNum(97,123));
}


function generateUpperCase(){
    return String.fromCharCode (getRandomNum(65 ,91));
}

function generateSymbol(){
    const randomSym = getRandomNum(0,symbol.length);
    return symbol.charAt(randomSym); 
}



checkStrength();

function checkStrength(){
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false ;
    let hasSymbol = false ;

    if(uppercaseCheck.checked) hasUpperCase = true ;
    if(lowercaseCheck.checked) hasLowerCase = true ;
    if(numbercheck.checked) hasNumber = true ;
    if(symbolcheck.checked) hasSymbol = true ;

    if(hasLowerCase  && hasUpperCase && ( hasNumber || hasSymbol) && passwordLength >=8){
        setIndicator("#03C988");
       
    }
    else if((hasLowerCase || hasUpperCase) && (hasNumber || hasSymbol ) && passwordLength>=6){
        setIndicator("#FF1E00");
        
    }

    else{
        setIndicator("##E5E4E2");
        
    }

}




function shufflePassword(array){
    for(let i= array.length - 1 ;i>0 ;i--){
        const j = Math.floor(Math.random()*(i+1)) ;
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    let str = "";
    array.forEach((el)=>{
        str += el;
    });
    return str;
     

}




async function copyContent(){
    try{
      await navigator.clipboard.writeText(passwordDisplay.value);
      copymsg.innerText ="Copied";  
    }
    catch(e){
        copymsg.innerText = "Failed";
    }

    //to make copymsg visible 
    copymsg.classList.add("active");

    //after copied make text hidden
    setTimeout( () =>{
        copymsg.classList.remove("active");
    },2000);
};


inputslider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleslider();
});



copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});


function handalCheckBoxChange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
    }) ;

    //special condition for (if password length is less than checkboxcount then password  = checkboxcount)

    if(passwordLength<checkcount){
        passwordLength = checkcount ;
        handleslider();
    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handalCheckBoxChange);
})


generator.addEventListener('click',()=>{

    //check if checkcount is empty or not
    if(checkcount<=0) return ;


    // checks if password length is less than checkcount 
    //if less than passlength = checkcount
    if(passwordLength < checkcount){
        passwordLength = checkcount ;
        handleslider();
    }
    

    password ="";
    

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase)
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase)
    }

    if(numbercheck.checked){
        funcArr.push(generateRandomNumber)
    }

    if(symbolcheck.checked){
        funcArr.push(generateSymbol)
    }


    //complusary add checked values

    for(let i=0 ;i<funcArr.length ;i++){
        password += funcArr[i]();
    }
   

    //remaning values addition

    for(let i =0 ; i< passwordLength - funcArr.length ;i++){
        let randomindex = getRandomNum(0,funcArr.length);
        password += funcArr[randomindex]();

    }
    password = shufflePassword(Array.from(password));


    
    passwordDisplay.value= password;
    
    checkStrength();
         
   
    
    

   



})

