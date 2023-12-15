import {
    getAlllight,
    postlight,
    updatelight,
    deletelight,
    findElementById
}from "./BackEnd.js";

import {
    getInputValues,
    cleanInput,
    addItemToPage,
    cleanInputEd,
    getInputValuesEdit,
} from "./dom_util.js";


const listObj = document.getElementById('list__object');
let objList = []

const sortButton = document.getElementById('sort_butt');

const FuelButton = document.getElementById('Fuel');
const textOut = document.getElementById('Fuel__text');
const search = document.getElementById('search_butt');
const search_inp = document.getElementById('search');

const forma = document.getElementById('ObjForm');


function BuldingPage() {
    objList.forEach(el => {
        let {id, title, description, fuel} = el
        addItemToPage(id, title, description, fuel);
    })
}

function ClearList() {
    objList= []

    while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };
}
function ExtractAllElements(){
    let promise = getAlllight();

    objList = []

    while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };

    promise.then(data => {
        data.forEach(obj => {
            objList.push(obj)
        });

    BuldingPage();
});
}


ExtractAllElements();


// Search
search.addEventListener('click', (event) =>{
   event.preventDefault();

   let curr = [] ;
   objList.forEach((el) => {
       let {title} = el;
       if (title.toLowerCase().indexOf(search_inp.value.toLowerCase()) !== -1) {
            curr.push(el);
       }

   });
   ClearList();
   curr.forEach((el) =>{

       let {id, title, description, fuel} = el;
       addItemToPage(id, title, description, fuel);
   });
});
// End Search

// Fuel
FuelButton.addEventListener("click", (event) => {
    event.preventDefault();
    let val = []
    let result = 0;
    objList.forEach((el) => {
        let {fuel} = el;
        val.push(parseInt(fuel));
    });
    result = val.reduce((a, b) =>{
        return a + b ;
    },0);

    textOut.innerText = result;

});
// End Fuel

// Sort
sortButton.addEventListener("click", (event) => {
    // event.preventDefault();

    objList.sort((a, b) => {
        if (a.fuel < b.fuel) return -1;
        if (a.fuel > b.fuel) return 1;

        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;

        if (a.description < b.description) return -1;
        if (a.description > b.description) return 1;

        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;


        return 0;
    });

   while (listObj.firstChild) {
       listObj.removeChild(listObj.firstChild);
   };

   objList.forEach((el) =>{
       let {id, title, desc, fuel} = el;
       addItemToPage(id, title, desc, fuel);
   });

});
// End SOrt


//More fitch

forma.addEventListener("submit", async (e) => {
  e.preventDefault();
  const subbut = e.submitter.value;

  if (subbut === "remove") {
    const objectId = e.submitter.id;
    await deletelight(objectId);

    await ExtractAllElements();


  }

    ClearList()
    BuldingPage();
});


// Create BLOCK




