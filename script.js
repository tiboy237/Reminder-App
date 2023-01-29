/* 
    This is where we grab any HTML elements
    that we are going to interact with.
*/

// Grab the search bar elements
const searchForm = document.getElementById("search");
const searchBar = document.getElementById("searchBar");

// Grab the "addReminderBtn" button and the form elements
const addReminderBtn = document.querySelector("#addReminderBtn");
const taskInput = document.querySelector("#task");
const dateInput = document.querySelector("#date");
const timeInput = document.querySelector("#time");
const remindersList = document.querySelector(".remindersList");

// Grab the clear and hide buttons
const clearBtn = document.querySelector("#clearButton");
const hideBtn = document.querySelector("#hideButton");

// Grab the "Edit" button
const editButton = document.querySelector(".edit");

// Grab the "O" Completed number
const completedCounter = document.querySelector("#completedCounter");

// Grab the numbers inside the boxes (top-left corner)
const todayBox = document.querySelector("#num1");
const scheduledBox = document.querySelector("#num2");
const allBox = document.querySelector("#num3");
const flaggedBox = document.querySelector("#num4");
const todoBox = document.querySelector("#num5");
const familyBox = document.querySelector("#num6");

// Grab the lists dropdown
const myLists = document.querySelector("#myLists");

// Grab the addListBtn
const addListBtn = document.querySelector("#addListBtn");

// Grab the add List Div
const addListDiv = document.querySelector(".addList");



/*
    This is where we declare our global variables
*/

// Empty Lists of gifts, prices and stores
let tasksList = [];
let datesList = [];
let timesList = [];
let listTypeList = [];
// Create a list in javascript that hold our lists choices
let listChoices = ["-- Select one of your list --", "To Do List", "Family List"]
// New List Categories Names
let newListNames = ["ToDo", "Family"];



/*
    This is where we write our code for our differents
    events listeners for the elements on the page
*/

// Add a submit event listener to the search form
searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting
    searchReminders();
});

// Add a click event listener to the "Edit" button
editButton.addEventListener("click", (event) => {
    event.preventDefault(); // prevent the link from navigating
    editBtn();
});

// Add a click event listener to the "Add Reminder" button
addReminderBtn.addEventListener("click", () => {
    addReminder();
    boxesHandle();
    resetInputs();
});

// Add a click event listener to the "Add List" Button
addListBtn.addEventListener("click", () => {
    let currentListName = prompt("Enter the name of the new list!");
    currentListName = currentListName.toLowerCase(); 
    let parts = currentListName.split(" ");
    let newListName = "";
    for (let i = 0; i < parts.length; i++) {
        newListName += parts[i][0].toUpperCase() + parts[i].slice(1) + " ";
    }
    let firstWord = newListName.substring(0, newListName.indexOf(" "));
    if(!listChoices.includes(newListName) && !newListNames.includes(firstWord)){
        listChoices.push(newListName);
        newListNames.push(firstWord);
    }
    myLists.innerHTML = "";
    for (let i = 0; i < listChoices.length; i++) {
      myLists.appendChild(addNewList(listChoices[i]));
    }
    myLists[0].disabled = true;
    // const listsOutput = document.querySelector(".lists");
    // listsOutput.innerHTML = "";
    // listsOutput.innerHTML = "<h1>My Lists</h1>";
    
    const newAddedList = buildNewList(newListNames[newListNames.length-1]);
    addListDiv.insertAdjacentElement("beforebegin", newAddedList);

    // Give a random Color to the icon of the new list
    const newListIcon = document.querySelector(`.container .lists .list.${firstWord.toLowerCase()} .icon`);
    let min = 0, max = 255;
    let randomRed = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomGreen = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomBlue = Math.floor(Math.random() * (max - min + 1)) + min;
    newListIcon.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
})

// Add a click event listener for the "Clear" button
clearBtn.addEventListener("click", function(){
    remindersList.innerHTML = "";
    tasksList = [];
    datesList = [];
    timesList = [];
    listTypeList = [];
    todayBox.textContent = 0;
    allBox.textContent = 0;
    scheduledBox.textContent = 0;
    flaggedBox.textContent = 0;
    completedCounter.textContent = 0;
    todoBox.innerHTML = `${0}<i class="bi bi-chevron-right"></i>`;
    familyBox.innerHTML = `${0}<i class="bi bi-chevron-right"></i>`;
});

// Add a click event listener for the "Clear" button
hideBtn.addEventListener("click", function(){
    hideShow();
});



/*
    This is where we write our code for our differents
    functions that we call in the event listeners
*/
// Search bar function to search for reminders
function searchReminders(){
    console.log("Not Yet Functional!");
}

// Function to handle the numbers in the boxes
function boxesHandle(){
    // Create a string for the date of today
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy+"-"+mm+"-"+dd;

    let chosenDate = dateInput.value;
    if (today == chosenDate) { 
        // The date the user chose is today
        let todayNum = parseInt(todayBox.textContent);
        todayBox.textContent = todayNum + 1;
    } else if (today != chosenDate && dateInput.value != "") {
        let scheduleNum = parseInt(scheduledBox.textContent);
        scheduledBox.textContent = scheduleNum + 1;
    }
    allBox.textContent = tasksList.length;
}

/**
    This function will build and return a new option for the lists in the dropdown menu
    @param {string} listName The name of the task that the user gave
    @return {HTMLOptionElement} The new option element that is going to be added to our dropdown
*/
function addNewList(listName){
    let newList = document.createElement("option");
    newList.value = listName.toLowerCase();
    newList.textContent = listName;
    return newList;
}
/**
    This function will build and return a new block for the lists in the left side of the page
    @param {string} title The title which is used as classame and also the title itself
    @return {HTMLDivElement} The new Div element that hold the information about the list added
*/
function buildNewList(title){
    const div = document.createElement("div");
    div.classList.add("list", title.toLowerCase());
    let n = 6;
    div.innerHTML =`
        <i class="bi bi-list-ul icon"></i>
        <div class="info">
            <div class="title">${title}</div>
            <div class="number" id="num${n + 1}">0<i class="bi bi-chevron-right"></i></div>
        </div>
    `;
    return div;
}

// Edit Button function
function editBtn(){

    // Get the elements that you want to make editable
    // The elements are <p> tags with the class "editable"
    const editableElements = document.querySelectorAll("p.editable");

    // Loop through the editable elements and make them contenteditable
    editableElements.forEach(el => {
            el.contentEditable = true;
    });

    // Change the text of the button to "Save"
    editButton.innerHTML = "Save";

    // Add a click event listener to the button again, this time to handle the "Save" functionality
    editButton.addEventListener("click", () => {
        // Loop through the editable elements and make them non-editable
        editableElements.forEach(el => {
            el.contentEditable = false;
        });

        // Change the text of the button back to "Edit"
        editButton.innerHTML = "Edit";

    });

}

//  Function to hide and/or show the different tasks
function hideShow(){
    let listContainer = document.querySelector(".remindersList");
    if (listContainer.style.display === "none") {
        hideBtn.textContent = "Hide";
        listContainer.style.display = "block";
    } else {
        hideBtn.textContent = "Show";
        listContainer.style.display = "none";
    }
}

// Add Reminder function
function addReminder() {
    // Get the task, date, and time from the form
    let task = taskInput.value;
    let date = dateInput.value;
    let time = timeInput.value;
    let selectedList = myLists.value;

    if(task === "" || date === "" || time === "") {
        alert("Make sure you fill in the form before to add!");
        taskInput.focus();
    } else {
        // Create a new list item with the task, date, and time
        // now we want to add the item and his infos to the correct lists
        tasksList.push(task);
        datesList.push(date);
        timesList.push(time);
        listTypeList.push(selectedList);

        // Clear the output box and put back the titles
        remindersList.innerHTML = "";
        remindersList.innerHTML = `
                <div class="row">
                <p class="iconTitle"> 🚩 </p>
                <p style="font-weight: bold;">Tasks</p>
                <p style="font-weight: bold;">Date<br>(YYYY-MM-DD)</p>
                <p style="font-weight: bold;">Time<br>(HH-MM)</p>
                <p style="font-weight: bold;">List</p>
                <p class="iconTitle"> ✅ </p>
            </div>
        `;
        
        // Display the elements in the output box
        for (let i = 0; i < tasksList.length; i++) {
            const newReminder = buildRow(tasksList[i], datesList[i], timesList[i], listTypeList[i]);
            remindersList.insertAdjacentElement("beforeend", newReminder);
        }

        // Enable clear and hide button
        clearBtn.disabled = false;
        hideBtn.disabled = false;
        clearBtn.style.color = "#277fcf";
        hideBtn.style.color = "#277fcf";

        // add todo List and 
        if(selectedList === "to do list"){
            let todoNum = parseInt(todoBox.textContent);
            todoBox.innerHTML = `${todoNum + 1}<i class="bi bi-chevron-right"></i>`;
        } else if (selectedList === "family list"){
            let famNum = parseInt(familyBox.textContent);
            familyBox.innerHTML = `${famNum + 1}<i class="bi bi-chevron-right"></i>`;
        }

        // Code to count the completed tasks
        let checkboxes = document.querySelectorAll(".checkDone");

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("input", checkingBoxes);
        });
        
        function checkingBoxes() {
            let checkedCount = 0;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkedCount++;
                }
            });
            completedCounter.textContent = parseInt(completedCounter.textContent);
            completedCounter.textContent = checkedCount;
            // Add code to delete task here
            console.log(`${checkedCount} checkboxes have been checked.`);
        }

        // Code to count the flagged tasks
        let flaggedboxes = document.querySelectorAll(".checkFlag");

        flaggedboxes.forEach(flaggedbox => {
            flaggedbox.addEventListener("input", flaggedBoxes);
        });
        
        function flaggedBoxes() {
            let flaggedCount = 0;
            flaggedboxes.forEach(flaggedbox => {
                if (flaggedbox.checked) {
                    flaggedCount++;
                }
            });
            flaggedBox.textContent = parseInt(flaggedBox.textContent);
            flaggedBox.textContent = flaggedCount;
            // Add code to move the task up here
            console.log(`${checkedCount} checkboxes have been checked.`);
        }
    }

}

/**
This function will build and return a division with a class name, containing the reminder infos
@param {string} task The name of the task that you schedule
@param {string} date The date you do the task
@param {string} time The time you do the task
@param {string} listType The name of the list you chose
@return {HTMLDivElement} The Div that hold the infos about the task
*/

function buildRow(task, date, time, listType) {
    const div = document.createElement("div");
    const checkboxDone = document.createElement("input");
    const taskP = document.createElement("p");
    const dateP = document.createElement("p");
    const timeP = document.createElement("p");
    const listTypeP = document.createElement("p");
    // creating checkbox element
    const checkboxFlag = document.createElement("input");         
    // Assigning the attributes to created checkbox
    checkboxFlag.type = "checkbox";
    checkboxFlag.className = "checkFlag";
    checkboxFlag.name = "checkbox1";
    checkboxDone.type = "checkbox";
    checkboxDone.className = "checkDone";
    checkboxDone.name = "checkbox2";
    // checkbox.value = "value";
    // flagRadio.value = "value";
    // flagRadio.id = "id";

    div.className = "row";
    taskP.className = "editable";
    taskP.textContent = task;
    taskP.style.fontWeight = "bold";
    dateP.textContent = date;
    timeP.textContent = time;
    listTypeP.textContent = listType.toUpperCase();

    div.insertAdjacentElement("afterbegin", checkboxFlag);
    div.insertAdjacentElement("beforeend", taskP);
    div.insertAdjacentElement("beforeend", dateP);
    div.insertAdjacentElement("beforeend", timeP);
    div.insertAdjacentElement("beforeend", listTypeP);
    div.insertAdjacentElement("beforeend", checkboxDone);

    return div;
}


// Function to reset the inputs entries
function resetInputs() {
    taskInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    myLists.value = "0";
    taskInput.focus();
}