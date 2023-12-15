const nameInp = document.getElementById('name_inp');
const descInp = document.getElementById('desc_inp');
const fuelInp = document.getElementById('fuel_inp');
const listObj = document.getElementById('list__object');

const descInpEd = document.getElementById('descEd_inp');
const fuelInpEd = document.getElementById('fuelEd_inp');
const nameInpEd = document.getElementById('nameEd_inp');

export const getInputValuesEdit = () =>{
    return {
      title: nameInpEd.value,
      desc: descInpEd.value,
      fuel: fuelInpEd.value,
  };
};


export const cleanInputEd = () => {
    nameInpEd.value = "";
    descInpEd.value = "";
    fuelInpEd.value = "";

}

export const getInputValues = () => {
  return {
      title: nameInp.value,
      desc: descInp.value,
      fuel: fuelInp.value,
  };
};

export const cleanInput = () => {
    nameInp.value = "";
    descInp.value = "";
    fuelInp.value = "";

}
const itemTemplate = ({id, title, desc, fuel }) => `
                        <div class="object" >
                        
                        <div class="object__img">
                            <img src='/static/labWeb/images/planes.jpg' alt="Nemam">
                        </div>
                        
                        <div class="object__text">
                            <h3> Title: <br></h3>
                            <h3 class="name_sec">${title}</h3>
                            <p>Desc: <br></p>
                            <p class="desc_sec">${desc}</p>
                            <p>Fuel :<br></p>
                            <p class="fuel_sec">${fuel}</p>
                        </div>
                        
                        <div class="object__button">
                            <button type="submit" class="button bgr Edit__butt_start" id="Ed_${id}" value="edit">Edit</button>
                            <button type="submit" class="button remove" id = "${id}" value="remove">Remove</button>
                        </div>

                    </div>`;

export const addItemToPage = (id, title, desc, fuel) => {
  listObj.insertAdjacentHTML(
    "beforeend",
    itemTemplate({id, title, desc, fuel })
  )};