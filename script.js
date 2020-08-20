let rows = [];
let colums = [];

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
      buttonAdd.innerHTML = "X";
      cell1.appendChild(buttonAdd);

      // Add input-field c1
      let inputC1 = document.createElement("input");
      inputC1.type = "text";
      cell1.appendChild(inputC1);

      // Add input-field
      let inputC2 = document.createElement("input");
      inputC2.type = "text";
      cell2.appendChild(inputC2);

      row.id = i;
      // Remove-btn functionallity
      buttonAdd.addEventListener("click", removeBtn);
      break;
    }
  }
}

document.getElementById("add-row").addEventListener("click", addRow);

// Remove-btn functionallity
function removeBtn() {
  // Get remove btn class

  let row = this.parentNode.parentNode;
  let rowId = parseInt(row.id);
  // Remove row id from array
  rows.splice(rows.indexOf(rowId));
  // Remove row
  row.parentNode.removeChild(row);
}

// Add functionality to calc-btn
function data() {
  let v0 = [];
  let v1 = [];
  for (test of rows) {
    let grandParentNode = document.getElementById(parseFloat(test));
    let parent = grandParentNode.children;
    // Data points
    let dp0 = parent[0].children[1].value;
    let dp1 = parent[1].children[0].value;
    v0.push(dp0);
    v1.push(dp1);
  }
}
document.getElementById("calc").addEventListener("click", data);
