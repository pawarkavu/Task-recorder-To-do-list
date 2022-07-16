var tasks = document.getElementsByClassName('task');

for(let i of tasks){
  // To apply line-through style to text when checkbox is clicked
    i.getElementsByTagName('input')[0].addEventListener('change', function() {
        if (this.checked) {
          i.getElementsByTagName('p')[0].style.textDecoration = 'line-through';
          i.getElementsByTagName('span')[0].style.textDecoration = 'line-through';
        } else {
            i.getElementsByTagName('p')[0].style.textDecoration = 'none';
            i.getElementsByTagName('span')[0].style.textDecoration = 'none';
        }
      });
    i.getElementsByTagName('button')[0].addEventListener('click', function () {
      buttons = setupPopup(i);
      buttons["submit"].addEventListener('click', function () {
        let description = buttons["dataInputs"]["descInput"][0].value;
        let date = buttons["dataInputs"]["descInput"][1].value;
        let category = buttons["dataInputs"]["categoryInput"][0].value;
        let id = buttons["id"];
        let data = {id,date,category,description}
        fetch("http://localhost:8000/action/edit-tasks", {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            location.reload();
          })
      });
      buttons["cancel"].addEventListener('click', function () {
        location.reload();
      });
    });
      // Show alert dialog with information when button is clicked
    i.getElementsByTagName('button')[1].addEventListener('click', function(){
        let res;
        res = "Task : " + i.getElementsByTagName('p')[0].innerText + "\n" +
              "Deadline : " + i.getElementsByTagName('span')[0].innerText + "\n" +
              "Category : " + this.innerText;
        window.alert(res);
    });
}


function setupPopup(i) {
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
  let descInput = popup.getElementsByTagName("input");
  let categoryInput = popup.getElementsByTagName("select");
  let task = i.getElementsByTagName('p')[0].innerText;
  let deadline = i.getElementsByTagName('span')[0].innerText;
  let category = i.getElementsByTagName('button')[1].innerText;
  if (deadline != "No Deadline") {
    let date = new Date(deadline);
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset * 60 * 1000))
    descInput[1].value = date.toISOString().split('T')[0];
  }
  descInput[0].value = task;
  categoryInput[0].value = category.toLocaleLowerCase()
  console.log({ task, deadline, category, descInput, categoryInput, date })
  const popupSubmitBtn = document.querySelector(".popup-btn.accept");
  const popupCancelBtn = document.querySelector(".popup-btn.cancel");
  let id = i.getElementsByTagName('input')[0].value;
  return {
    id,
    "submit": popupSubmitBtn, "cancel": popupCancelBtn, "dataInputs": {
    descInput,categoryInput
  }};
}