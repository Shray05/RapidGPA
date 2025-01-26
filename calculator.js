// Script to dynamically add one new input per row, next to the existing inputs
let courseCount = 1;

function addRow(event) {
  // Get the button that triggered this function
  const button = event.target;

  // Find the nearest components container relative to the button clicked
  const componentsContainer = button.previousElementSibling;

  // Create a new input column for each label
  const labelInputPairs = componentsContainer.querySelectorAll('.label-input-pair');
  labelInputPairs.forEach((pair, index) => {
    const newInput = document.createElement('input');
    newInput.type = 'text';

    // Set placeholder based on the label type
    if (index === 0) {
      newInput.placeholder = 'e.g. New Component';
    } else if (index === 1) {
      newInput.type = 'number';
      newInput.placeholder = 'e.g. New Grade';
    } else if (index === 2) {
      newInput.type = 'number';
      newInput.placeholder = 'e.g. New Weight';
    }

    pair.appendChild(newInput);
  });
}

function addCourse() {
  courseCount++;

  const coursesContainer = document.getElementById('courses-container');

  // Create a new course section
  const newCourseSection = document.createElement('div');
  newCourseSection.classList.add('components-section');
  newCourseSection.id = `components-section-${courseCount}`;

  // Add the course structure
  newCourseSection.innerHTML = `
    <div class="course-info">
      <label for="course-name-${courseCount}">Course:</label>
      <input type="text" id="course-name-${courseCount}" placeholder="Enter course name">

      <label for="credits-${courseCount}">Credits:</label>
      <input type="number" id="credits-${courseCount}" placeholder="Credits">
    </div>
    <div id="components-container-${courseCount}" class="components-container">
      <div class="label-input-pair">
          <label for="input-1">Components:</label>
          <input type="text" id="input-1" placeholder="e.g. Component 1"/>
          <input type="text" id="input-1" placeholder="e.g. Component 1"/>
          <input type="text" id="input-1" placeholder="e.g. Component 1"/>
        </div>
        <div class="label-input-pair">
          <label for="input-2">Grades:</label>
          <input type="number" id="input-2" placeholder="e.g. 90"/>
          <input type="number" id="input-2" placeholder="e.g. 87"/>
          <input type="number" id="input-2" placeholder="e.g. 50"/>
        </div>
        <div class="label-input-pair">
          <label for="input-3">Weight:</label>
          <input type="number" id="input-3" placeholder="e.g. 35"/>
          <input type="number" id="input-3" placeholder="e.g. 25"/>
          <input type="number" id="input-3" placeholder="e.g. 40"/>
        </div>
      </div>
      <button class="add-component" onclick="addRow(event)">+</button>

  `;

  // Append the new course section before the "Add Another Course" button
  coursesContainer.appendChild(newCourseSection);

  // Move the "Add Another Course" button below the newly added section
  const addCourseButton = document.querySelector('.add-course');
  coursesContainer.appendChild(addCourseButton);
}
