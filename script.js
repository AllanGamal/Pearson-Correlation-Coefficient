let rows = [];

// Function generate rows

function generateRow() {
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
      row.className = "row";

      // Remove-btn functionallity
      buttonAdd.addEventListener("click", removeBtn);

      // Add scrollbar when many datapoints
      let tbody = document.querySelector("tbody");
      if (rows.length >= 15) {
        tbody.className = "scroll";
      }

      break;
    }
  }
}

// Generate 3 rows
for (let i = 0; i < 5; i++) {
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
  let tableData = document.querySelectorAll("td");

  for (element of elements) {
    let parent = element.parentNode;
    for (dataPoint of tableData) {
      if (element.parentNode == dataPoint) {
        if (isNaN(element.value) || !element.value) {
          parent.classList.add("NaN");
        } else {
          parent.classList.remove("NaN");
        }
      }
    }
    if (element.classList === "NaN") {
    }
  }

  for (element of elements) {
    if (element.parentNode.classList == "NaN") {
      alert("Please enter valid data(numbers)");
      return false;
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
    let b11 = b1(v0, v1);
    let b00 = b0(mean(v0), mean(v1), b1(v0, v1));

    chartIt(
      convertDataSet(v0, v1),
      convertDataSet(v0, newY(v0, b00, b11).reverse())
    );
    // Show result on page
    document.querySelector(".container__table--results").style.display = "flex";
    document.getElementById("b0").innerHTML = "b0 = " + b00.toFixed(3);
    document.getElementById("b1").innerHTML = "b1 = " + b11.toFixed(3);
    document.getElementById("r").innerHTML = "r = " + result.toFixed(3);
  }
}

document.getElementById("calc").addEventListener("click", calc);

//

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

function chartIt(dataset, datasetNewY) {
  const ctx = document.getElementById("chart").getContext("2d");
  var mixedChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Scatter Plot",
          data: dataset,
          pointBackgroundColor: "red",
        },
        {
          label: "Regression Line",
          data: datasetNewY,
          backgroundColor: "rgba(255, 0, 0, 0)",
          pointBackgroundColor: function () {
            let color = [];
            for (let i = 0; i < dataset.length; i++) {
              color.push("rgba(80, 150, 216, 0.1)");
            }
            return color;
          },

          // Changes this dataset to become a line
          type: "line",
        },
      ],
    },
  });
}
chartIt();

// Function for converting datapoints to dataset the chart accepts!
function convertDataSet(axesX, axesY) {
  let dataset = [];
  for (let i = 0; i < axesX.length; i++) {
    dataset.push({ x: axesX[i], y: axesY[i] });
  }
  return dataset;
}

function b1(xArr, yArr) {
  let slope = firstHalf(xArr, yArr) / secondHalfSlope(xArr);
  return slope;
}

function secondHalfSlope(arrX) {
  let xm = mean(arrX);
  // FORMULA SQ ( SUM(x - xm)sq * SUM(y - ym)sq )
  let sumOfX = 0;
  for (let i = 0; i < arrX.length; i++) {
    sumOfX += Math.pow(arrX[i] - xm, 2);
  }
  return sumOfX;
}

function b0(xMean, yMean, slope) {
  // FORMULA b0 = ym - b1*xm
  let b0 = yMean - slope * xMean;
  return b0;
}

// New y for every x
function newY(xArr, b0, b1) {
  let y = [];
  // FORMULA y = b0 + b1*x
  for (let i = 0; i < xArr.length; i++) {
    y.push(b0 + b1 * xArr[i]);
  }
  return y.reverse();
}

// Upload csv-file to table

function Upload() {
  let file = document.getElementById("file");
  let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(file.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      let reader = new FileReader();
      reader.onload = function (e) {
        let rows = e.target.result.split("\n");
        let xArr = [];
        let yArr = [];
        let arrD = [];

        for (let i = 0; i < rows.length; i++) {
          let cells = rows[i].split(",");
          xArr.push(parseFloat(cells[0]));
          yArr.push(parseFloat(cells[1]));
        }
        xArr = xArr.reverse();
        yArr = yArr.reverse();

        arrD.push(xArr);
        arrD.push(yArr);

        generateCsvData(arrD);
      };

      reader.readAsText(file.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}

document.querySelector("#upload").addEventListener("click", Upload);

function generateCsvData(arr) {
  let tableRows = document.querySelectorAll(".row");

  for (talbeRow of tableRows) {
    talbeRow.remove();
  }

  let table = document.querySelector("table");
  rows = [];

  for (let i = 0; i < arr[0].length; i++) {
    if (!rows.includes(i)) {
      let row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      rows.push(i);
      // Add remove-btn
      let buttonAdd = document.createElement("button");
      buttonAdd.setAttribute("class", "remove-row");
      buttonAdd.innerHTML = "X";
      cell1.appendChild(buttonAdd);

      // Add input-field c1
      let inputC1 = document.createElement("input");
      inputC1.type = "text";
      inputC1.value = arr[0][i];
      cell1.appendChild(inputC1);

      // Add input-field
      let inputC2 = document.createElement("input");
      inputC2.type = "text";
      inputC2.value = arr[1][i];
      cell2.appendChild(inputC2);

      row.id = i;
      row.className = "row";

      // Remove-btn functionallity
      buttonAdd.addEventListener("click", removeBtn);
    }
  }
  let tbody = document.querySelector("tbody");
  if (rows.length >= 20) {
    tbody.className = "scroll";
  }
}
