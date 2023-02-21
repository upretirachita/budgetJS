// SELECT ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeSum = document.querySelector(".income-sum");
const expenseSum = document.querySelector(".expense-sum");

const incomeElement = document.querySelector("#income");
const expenseElement = document.querySelector("#expense");
const allElement = document.querySelector("#all");

const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");
//const list = document.querySelector(".list");


// SELECT BTNS
const expenseBtn = document.querySelector(".expence-btn");
const incomeBtn = document.querySelector(".income-btn");
const allBtn = document.querySelector(".all-btn");

// INPUT 
const addIncome = document.querySelector(".add-income-button");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

const addExpense = document.querySelector(".add-expense-button");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

// VARIABLES
let ENTRY_LIST;
let  income = 0, expense = 0, balance = 0;
const DELETE = "delete";
// LOOK IF THERE IS SAVED DATA IN LOCALSTORAGE
    //localStorage.setItem("key",VALUE)
    //localStorage.getItem("key")
    //before we have object or array we need to convert to JSON
    //JS object or value to JSON string we need JSON.stringify() method 
    //[0,1,2,3] to JSON "[0,1,2,3]"
    //{x:2,y:3} to JSON "{"x:2","y:3"}"
    //after we need JSON string we need to convert back to object or value JSON.parse() method
//localStorage.setItem("entry_list",JSON.stringify(ENTRY_LIST));-->updated in updateUI(funtion)

ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];//getting back from localStorage 
updateDisplay();

// EVENT LISTENERS
expenseBtn.addEventListener("click", function(){
    show(expenseElement);
    hide( [incomeElement, allElement] );
    active( expenseBtn );
    inactive( [incomeBtn, allBtn] );
})
incomeBtn.addEventListener("click", function(){
    show(incomeElement);
    hide( [expenseElement, allElement] );
    active( incomeBtn );
    inactive( [expenseBtn, allBtn] );
})
allBtn.addEventListener("click", function(){
    show(allElement);
    hide( [incomeElement, expenseElement] );
    active( allBtn );
    inactive( [incomeBtn, expenseBtn] );
})

//Add Income
addIncome.addEventListener("click", () => {
     // IF ONE OF THE INPUTS IS EMPTY => EXIT
     if(!incomeTitle.value || !incomeAmount.value ) return;
     // SAVE THE ENTRY TO ENTRY_LIST
     let income = {
         type : "income",
         title : incomeTitle.value,
         amount : parseInt(incomeAmount.value)
     }
     ENTRY_LIST.push(income);
     updateDisplay();
     clearInput([incomeTitle,incomeAmount]);
     console.log(income)
})

//Add Expence
addExpense.addEventListener("click", () => {
    if(!expenseTitle.value || !expenseAmount.value ) return;
    let expense = {
        type : "expense",
        title : expenseTitle.value,
        amount : parseInt(expenseAmount.value)
    }
    ENTRY_LIST.push(expense);
    updateDisplay();
    clearInput([expenseTitle,expenseAmount]);
    console.log("expense",expense.amount);
})

//Calacute Balance
function calculateTotal(type,ENTRY_LIST){
    console.log("entry",ENTRY_LIST)
    let sum = 0;
    ENTRY_LIST.forEach( entry => {
        if( entry.type == type ){
            sum += entry.amount;
        }
    })
    return sum; 
}

income = calculateTotal("income",ENTRY_LIST);
// console.log("income",income)

expense = calculateTotal("expense",ENTRY_LIST);
// console.log("income",expense)

function calculateBalance(income,expense){
    return income - expense;
}
console.log("totalbalance",calculateBalance(income,expense))

//Function that clear the value that user has input
function clearInput(inputs){
    inputs.forEach( input => {
        input.value = "";
    })
}
incomeList.addEventListener("click", deleteEvent);
expenseList.addEventListener("click", deleteEvent);
allList.addEventListener("click", deleteEvent);

function deleteEvent(event){
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;
    if( targetBtn.id == DELETE ){
        onDelete(entry);
    }
}
function onDelete(entry){
    //console.log("from Delete",entry.id)
    if(confirm(`Do you want to delete this info?`)){
        ENTRY_LIST.splice( entry.id, 1);
        updateDisplay();
    }
  }

function updateDisplay(){

    income = calculateTotal("income", ENTRY_LIST);
    expense = calculateTotal("expense", ENTRY_LIST);
    balance = Math.abs(calculateBalance(income,expense));

    let sign = (income >= expense) ? "€" : "-€";

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    incomeSum.innerHTML = `<small>€</small>${income}`;
    expenseSum.innerHTML = `<small>€</small>${expense}`;

    clearElement( [expenseList, incomeList, allList] );
    
    ENTRY_LIST.forEach( (entry, index) => {
        if( entry.type == "income" ){
            showEntry(incomeList , entry.type, entry.title, entry.amount, index)
        }else if( entry.type == "expense" ){
            showEntry(expenseList , entry.type, entry.title, entry.amount, index)
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index)
    });

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}


//Show Entry 
function showEntry(list, type, title, amount, id){
    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry">${title}: €${amount}</div>
                        <div id="delete"></div>
                    </li>`;

    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
}
function clearElement(elements){
    elements.forEach( element => {
        element.innerHTML = "";
    })
}

//For Toggle ALL OR INCOME OR EXPENCES
function show(element){
    element.classList.remove("hide");
}
//For Toggle ALL OR INCOME OR EXPENCES
function hide(elements){
    elements.forEach( element => {
        element.classList.add("hide");
    })
}
//For Toggle ALL OR INCOME OR EXPENCES
function active(element){
    element.classList.add("active");
}
//For Toggle ALL OR INCOME OR EXPENCES
function inactive(elements){
    elements.forEach( element => {
        element.classList.remove("active");
    })
}






