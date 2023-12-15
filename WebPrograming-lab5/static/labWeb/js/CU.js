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

// Create Bar

const CreateBlock = document.getElementById('Create__block');
const VisibleButtCre = document.getElementById('create_butt');
const listObj = document.getElementById('list__object');


const Create = document.getElementById('Create_inp_in');
const UnvisibleButtCre = document.getElementById('back_in');

function VisibleCreateBar() {
    listObj.style.display = 'none'
    CreateBlock.style.display = 'block'
    EditBar.style.display = 'none'
}

function UnvisibleCreateBar() {
    listObj.style.display = 'grid'
    CreateBlock.style.display = 'none'
}

function VisEd(){
    listObj.style.display = 'none';
    CreateBlock.style.display = 'none'
    EditBar.style.display = 'block';
}
function UnvisEd(){
    listObj.style.display = 'grid';
    EditBar.style.display = 'none';
}






VisibleButtCre.addEventListener('click', ev => {
    ev.preventDefault();
    VisibleCreateBar();
})


UnvisibleButtCre.addEventListener('click', ev => {
    ev.preventDefault();
    UnvisibleCreateBar();
})

Create.addEventListener('click', ev => {
    ev.preventDefault()

    const {title, desc, fuel} = getInputValues();

    postlight({
        title: title,
        description: desc,
        fuel: fuel
    })
    cleanInput();
    UnvisibleCreateBar();
    location.reload();

})

//End CreateBar

//EditBar
const EditBar = document.getElementById('Edit__block')
const forma = document.getElementById('ObjForm');

const descInpEd = document.getElementById('descEd_inp');
const fuelInpEd = document.getElementById('fuelEd_inp');
const nameInpEd = document.getElementById('nameEd_inp');

const Edit = document.getElementById('Edit_butt')
const UnvisibleButtEdit = document.getElementById('backEd_in')

let id ;

forma.addEventListener('submit', ev => {
  const sub = ev.submitter.value;
  console.log(sub)
  if (sub === 'edit') {
    listObj.style.display = 'none';
    EditBar.style.display = 'block';

    const str = ev.submitter.id;

    id = parseInt(str.split("_")[1], 10);

    console.log(id)
    console.log(findElementById(id))

    findElementById(id)
      .then(data => {
         let {title, description, fuel} = data
          console.log(data.title)
         nameInpEd.value = data.title;
         fuelInpEd.value = parseInt(data.fuel);
         descInpEd.value = data.description
      })
      .catch(error => {
        console.error(error);
      });
  }
});

UnvisibleButtEdit.addEventListener('click',ev => {
    ev.preventDefault();
    location.reload()
})


Edit.addEventListener('click', ev => {
    ev.preventDefault();

    const { title, desc, fuel } = getInputValuesEdit();
    console.log(desc)
    UnvisEd();

    updatelight({ id, title, description: desc, fuel });
    location.reload();

})




//End EditBar