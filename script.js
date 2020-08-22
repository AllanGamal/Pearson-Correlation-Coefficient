let colums = [];
let rows = [];

// Function generate rows
function generateRow() {
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

// Generate 3 rows
for (let i = 0; i < 3; i++) {
  generateRow();
}

// Add row and id datapoints

document.getElementById("add-row").addEventListener("click", generateRow);

// Remove-btn functionallity
function removeBtn() {
  if (rows.length > 3) {
    // Get remove btn class
    let row = this.parentNode.parentNode;
    let rowId = parseInt(row.id);

    // Remove row id from array

    rows.splice(rows.indexOf(rowId), 1);

    // Remove row
    row.parentNode.removeChild(row);
  }
}

// Add functionality to calc-btn
function calc() {
  let elements = document.getElementsByTagName("input");
  let test;

  for (element of elements) {
    let parent = element.parentNode;
    if (isNaN(element.value) || !element.value) {
      parent.classList.add("NaN");
    } else {
      parent.classList.remove("NaN");
    }
  }

  let v0 = [];
  let v1 = [];

  for (test of rows) {
    let grandParentNode = document.getElementById(parseFloat(test));
    let parent = grandParentNode.children;
    // Data points
    let dp0 = parent[0].children[1].value;
    let dp1 = parent[1].children[0].value;
    v0.push(parseFloat(dp0));
    v1.push(parseFloat(dp1));
  }

  // FORMULA => r = SUM( (x - xm)*(y - ym) ) / ( SQR ( SUM(x - xm)sq * SUM(y - ym)sq ) )
  let result = firstHalf(v0, v1) / secondHalf(v0, v1);
  if (!isNaN(result)) {
    console.log(result);
  }
}

document.getElementById("calc").addEventListener("click", calc);

//

let corr = [17, 13, 12, 15, 16, 14, 16, 16, 18, 19];
let att = [94, 73, 59, 80, 93, 85, 66, 79, 77, 91];

let v0 = [1];
let v1 = [2];

// Calc mean
function mean(arr) {
  // xm
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    count += arr[i];
  }
  let mean = count / arr.length;
  return mean;
}

// calc upper half of formula
function firstHalf(arrX, arrY) {
  let xm = mean(arrX);
  let ym = mean(arrY);
  // FORMULA SUM( (x - xm)*(y - ym) )
  let sumOf = 0;
  for (let i = 0; i < arrX.length; i++) {
    sumOf += (arrX[i] - xm) * (arrY[i] - ym);
  }
  return sumOf;
}

// calc lower half of formula
function secondHalf(arrX, arrY) {
  let xm = mean(arrX);
  let ym = mean(arrY);
  // FORMULA SQ ( SUM(x - xm)sq * SUM(y - ym)sq )
  let sumOfX = 0;
  let sumOfY = 0;
  for (let i = 0; i < arrX.length; i++) {
    sumOfX += Math.pow(arrX[i] - xm, 2);
    sumOfY += Math.pow(arrY[i] - ym, 2);
  }
  return Math.sqrt(sumOfX * sumOfY);
}

console.log(firstHalf(v0, v1) / secondHalf(v0, v1));
