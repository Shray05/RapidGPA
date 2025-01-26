// Script to dynamically add one new input per row, next to the existing inputs
function addRow() {
    const container = document.getElementById("components-container");

    // Loop through each of the original rows
    const rows = document.querySelectorAll(".label-input-pair");

    rows.forEach((row) => {
      // Create one new input element and append it to each row
      const newInput = document.createElement("input");
      newInput.type = "text"; // Set type as text for the new input
      row.appendChild(newInput); // Append the new input next to the existing ones
    });
  }
