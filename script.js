let rows = [];
let colums = [0, 1];

// Add row and id datapoints
function addRow() {
  let count;
  let table = document.querySelector("table");
  let row = table.insertRow(1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);

  for (let i = 0; i <= rows.length; i++) {
    if (!rows.includes(i)) {
      rows.push(i);
      // Add remove-btn
      let buttonAdd = document.createElement("button");
      buttonAdd.setAttribute("class", "remove-row");
      buttonAdd.setAttribute("id", "remove-row-" + i);
      buttonAdd.innerHTML = "X";
      cell1.appendChild(buttonAdd);

      // Add input-field c1
      let inputC1 = document.createElement("input");
      inputC1.type = "text";
      inputC1.setAttribute("class", "c1");
      cell1.appendChild(inputC1);

      // Add input-field
      let inputC2 = document.createElement("input");
      inputC2.type = "text";
      inputC2.setAttribute("class", "c2");
      cell2.appendChild(inputC2);

      row.id = i;
      //
      buttonAdd.addEventListener("click", removeBtn);
      break;
    }
  }
}

document.getElementById("add-row").addEventListener("click", addRow);

// Get remove btn class
function removeBtn() {
  console.log(this.className);
}
