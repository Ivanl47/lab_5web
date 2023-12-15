import {
    getInputValues,
    cleanInput,
    addItemToPage,
    cleanInputEd,
    getInputValuesEdit,
} from "./dom_util.js";

import {
    getAll,
    updateHamster,
    deleteHamster
} from "./BackEnd";
const sortButton = document.getElementById('sort_butt');
const listObj = document.getElementById('list__object');

const FuelButton = document.getElementById('Fuel');
const textOut = document.getElementById('Fuel__text');
const search = document.getElementById('search_butt');
const search_inp = document.getElementById('search');

console.log("1")
let flies =[];
let nowInPage = flies;

while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };

flies.forEach((el) => {

    let {title, desc, fuel} = el;

    addItemToPage(title, desc, fuel);
})
search.addEventListener('click', (event) =>{
   event.preventDefault();

   let curr = [] ;
   flies.forEach((el) => {
       let {title} = el;
       if (title.toLowerCase().indexOf(search_inp.value.toLowerCase()) !== -1) {
            curr.push(el);
       }

   });

   while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };

   nowInPage = curr;

   nowInPage.forEach((el) =>{
       let {title, desc, fuel} = el;
       addItemToPage(title, desc, fuel);
   });
});

FuelButton.addEventListener("click", (event) => {
    event.preventDefault();
    let val = []
    let result = 0;
    nowInPage.forEach((el) => {
        let {fuel} = el;
        val.push(parseInt(fuel));
    });
    result = val.reduce((a, b) =>{
        return a + b ;
    },0);

    textOut.innerText = result;




});

sortButton.addEventListener("click", (event) => {
    event.preventDefault();

    nowInPage.sort((a, b) => {
        // Спочатку сортуємо за паливом (зростаючий порядок)
        if (a.fuel < b.fuel) return -1;
        if (a.fuel > b.fuel) return 1;

        // Якщо паливо однакове, сортуємо за назвою (за алфавітом)
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;

        // Якщо і назва, і паливо однакові, сортуємо за описом
        if (a.desc < b.desc) return -1;
        if (a.desc > b.desc) return 1;

        return 0; // об'єкти однакові
    });

   while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };

   nowInPage.forEach((el) =>{
       let { title, desc, fuel} = el;
       addItemToPage( title, desc, fuel);
   });

});

// lab-2
let itemContainer = null;
let nameO = null;

let fuelIn = 0 ;
let descIn = "";
let titleIn = "";

const descInpEd = document.getElementById('descEd_inp');
const fuelInpEd = document.getElementById('fuelEd_inp');
const nameInpEd = document.getElementById('nameEd_inp');

const buttCreate = document.getElementById('create_butt');
const create_bar = document.getElementById('Create__block');
const buttback = document.getElementById('back_in');
const createInForm = document.getElementById('Create_inp_in');
const confEdButt = document.getElementById('Edit_butt');
const EditForm = document.getElementById('Edit__block')

const asite = document.getElementById('inSite');




const buttEdBack = document.getElementById('backEd_in');
buttCreate.addEventListener('click', (event) =>{

    event.preventDefault();
    let arr = []

    // event.preventDefault();
    //
    // create_bar.style.display = 'block';
    // EditForm.style.display = 'None';
    // asite.style.margin = "0 auto";
    // listObj.style.display = 'none';
});

buttback.addEventListener('click', (event) => {
    event.preventDefault();

    create_bar.style.display = 'None';
    EditForm.style.display = 'None'
    asite.style.margin = "0"
    listObj.style.display = 'grid';
    cleanInput();
});

createInForm.addEventListener('click', (event) => {

    let Status = true;
    event.preventDefault();
    let {title, desc, fuel} = getInputValues();
    if (title.trim() === "" || desc.trim() === "" || fuel.trim() === "") {
        alert("Invalid values ");
        Status = false;
    }

    if (Status){
            flies.push({title, desc, fuel});

     while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
     };

    flies.forEach((el) => {
        let {title, desc, fuel} = el;
        addItemToPage(title, desc, fuel)
    })


    }
    asite.style.margin = "0"
    create_bar.style.display = 'None';
    EditForm.style.display = 'None'
    listObj.style.display = 'grid';
    cleanInput();
});

listObj.addEventListener('click', (event) => {
  if (event.target.classList.contains("Edit__butt_start")) {

        asite.style.margin = "0 auto"
        listObj.style.display = 'none';
        create_bar.style.display = 'None';
        EditForm.style.display = 'block';

        itemContainer = event.target.closest('.object');

        nameO = itemContainer.querySelector('.name_sec').innerText;
         nameInpEd.value = nameO;
         titleIn = nameO;
         descInpEd.value = document.querySelector('.desc_sec').innerText;
         descIn = document.querySelector('.desc_sec').innerText;

         flies.forEach((el) => {
             let {title,desc, fuel} = el;
                if (title.indexOf(nameO) !== -1) {
                    if (desc.indexOf(document.querySelector('.desc_sec').innerText) !== -1) {
                        fuelInpEd.value = fuel;
                        fuelIn = fuel;
                    }
                }

   });
  }
});

buttEdBack.addEventListener('click', (event) => {
     listObj.style.display = 'grid';
     EditForm.style.display = 'none';
     create_bar.style.display = 'None';
     asite.style.margin = "0"
     itemContainer =null;
     nameO = null;

     cleanInputEd();
});

confEdButt.addEventListener('click', (event) =>{

        console.log(nameO)

        const index = nowInPage.findIndex(item => item.title === nameO);

            let curr= nowInPage[index];
            nowInPage[index] = getInputValuesEdit();

            const ind = flies.findIndex(item => item.title === nameO)
        flies[ind] = getInputValuesEdit();
        while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };
   flies.forEach((el) => {
       let {title, desc, fuel} = el;
            if (title.trim() === "" || desc.trim() === "" || fuel <= 0) {
                alert("Invalid values ");
                console.log("Oy")
                nowInPage[index].title = titleIn;
                nowInPage[index].desc = descIn;
                nowInPage[index].fuel = fuelIn;

                flies[ind].title = titleIn;
                flies[ind].desc = descIn;
                flies[ind].fuel = fuelIn;

                title = titleIn
                fuel= fuelIn;
                desc = descIn;
            }
            addItemToPage(title, desc, fuel);
        })

    listObj.style.display = 'grid';
    EditForm.style.display = 'none';
    create_bar.style.display = 'None';
    asite.style.margin = "0";

    nowInPage = flies;

     itemContainer =null;
     nameO = null;

     cleanInputEd();
});