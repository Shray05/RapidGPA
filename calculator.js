let courseCount = 1;

// Helper function to calculate the course grade
function calculateCourseGrade(courseSection) {
  const gradeInputs = courseSection.querySelectorAll('.grade-input');
  const weightInputs = courseSection.querySelectorAll('.weight');
  const gradeField = courseSection.querySelector('.grade');

  let totalWeight = 0;
  let weightedSum = 0;

  gradeInputs.forEach((gradeInput, index) => {
    const grade = parseFloat(gradeInput.value) || 0; // Default to 0 if empty or invalid
    const weight = parseFloat(weightInputs[index].value) || 0; // Default to 0 if empty or invalid

    weightedSum += grade * weight;
    totalWeight += weight;
  });

  // Calculate the weighted average
  const courseGrade = totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : 0;

  // Update the grade field
  gradeField.value = courseGrade;
}

// Function to add event listeners to inputs for dynamic calculation
function addCalculationListeners(courseSection) {
  const gradeInputs = courseSection.querySelectorAll('.grade-input');
  const weightInputs = courseSection.querySelectorAll('.weight');

  gradeInputs.forEach(input => {
    input.addEventListener('input', () => calculateCourseGrade(courseSection));
  });

  weightInputs.forEach(input => {
    input.addEventListener('input', () => calculateCourseGrade(courseSection));
  });
}

// Updated addRow function
function addRow(event) {
  const button = event.target;
  const componentsContainer = button.previousElementSibling;

  const labelInputPairs = componentsContainer.querySelectorAll('.label-input-pair');
  labelInputPairs.forEach((pair, index) => {
    const newInput = document.createElement('input');
    newInput.type = index === 0 ? 'text' : 'number';

    if (index === 0) {
      newInput.placeholder = 'e.g. New Component';
      newInput.classList.add('component');
    } else if (index === 1) {
      newInput.placeholder = 'e.g. New Grade';
      newInput.classList.add('grade-input');
      newInput.addEventListener('input', () => calculateCourseGrade(button.closest('.components-section')));
    } else if (index === 2) {
      newInput.placeholder = 'e.g. New Weight';
      newInput.classList.add('weight');
      newInput.addEventListener('input', () => calculateCourseGrade(button.closest('.components-section')));
    }

    pair.appendChild(newInput);
  });

  // Scroll the button horizontally into view if needed
  scrollHorizontallyIntoView(button);
}

// Updated addCourse function
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
      <label>Course:</label>
      <input type="text" class="course-name" placeholder="Enter course name">
      <label>Credits:</label>
      <input type="number" class="credits" placeholder="Credits">
      <label>Grade:</label>
      <input type="number" class="grade" placeholder="Grade" readonly>
    </div>
    <div class="components-container">
      <div class="label-input-pair">
        <label>Components:</label>
        <input type="text" class="component" placeholder="e.g. Component 1">
      </div>
      <div class="label-input-pair">
        <label>Grades:</label>
        <input type="number" class="grade-input" placeholder="e.g. 90">
      </div>
      <div class="label-input-pair">
        <label>Weight:</label>
        <input type="number" class="weight" placeholder="e.g. 35">
      </div>
    </div>
    <button class="add-component" onclick="addRow(event)">+</button>
  `;

  // Append the new course section
  coursesContainer.appendChild(newCourseSection);

  // Add calculation listeners to the new course section
  addCalculationListeners(newCourseSection);

  // Scroll the "Add Course" button horizontally into view if needed
  const addCourseButton = document.querySelector('.add-course');
  scrollHorizontallyIntoView(addCourseButton);
}

// Add calculation listeners to the initial course section
document.addEventListener('DOMContentLoaded', () => {
  const initialCourseSection = document.querySelector('.components-section');
  addCalculationListeners(initialCourseSection);
});