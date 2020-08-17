let rows = [];
let colums = [0, 1];
console.log(rows.length);

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
      cell1.innerHTML =
        '<button id="remove-row-' +
        i +
        '" class="remove-row">X</button> <input type="text" class="c1">';
      cell2.innerHTML = "<input type='text' class='c2'>";

      row.id = i;
      break;
    }
  }
}

document.getElementById("add-row").addEventListener("click", addRow);
