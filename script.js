let courses = [{name: "Web Design", students: []},{name: "Databse", students: []},{name: "Data Mining", students: []},{name: "Calculus", students: []}];
let students = [];
let allStudents = {}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}


//function for adding course
function addCourse() {
  const courseName = document.getElementById("courseName").value;

  if (courseName) {
    const newCourse = {
      name: courseName,
      students: [],
    };

    courses.push(newCourse);



    // Update the course dropdown
    updateCourseDropdown();

    // Update the attached courses list
    updateAttachedCoursesTable();

    // Clear input fields
    document.getElementById("courseName").value = "";

    // Display an alert view
    showAlert("Course Added", `Course "${courseName}" has been added successfully.`);

    // Close the modal
    closeModal("courseModal");
  } else {
    // Display an error alert view
    showAlert("Error", "Please enter course name.");
  }
}



//update for adding course
function updateAttachedCoursesTable(filteredCourses){
  const courseList = document.getElementById("courseList");
  courseList.innerHTML = "";

  // If filteredCourses is provided, use it; otherwise, use the original courses
  const coursesToDisplay = filteredCourses || courses;

  // Add rows to the table for each course
  coursesToDisplay.forEach((course, index) => {
      const row = document.createElement("tr");


       

      // Add course name to the row
      const nameCell = document.createElement("td");
      nameCell.textContent = course.name;
      row.appendChild(nameCell);

        // Add edit button to the row
    const editButton = document.createElement("button");
    editButton.style.backgroundColor = "orange";
    editButton.textContent = "Edit";
    editButton.onclick = () => editCourse(index);

    const actionCellEdit = document.createElement("td");
    actionCellEdit.appendChild(editButton);
    row.appendChild(actionCellEdit);

      // Add delete button to the row
      const deleteButton = document.createElement("button");
      deleteButton.style.backgroundColor = "red";
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteCourse(index);


     

      const actionCell = document.createElement("td");
      actionCell.appendChild(deleteButton);
      row.appendChild(actionCell);

      courseList.appendChild(row);
  });
}


//function for delete course
function deleteCourse(index) {
  // Remove the course at the specified index
  courses.splice(index, 1);

  // Update the course dropdown
  updateCourseDropdown();

  // Update the attached courses list
  updateAttachedCoursesTable();

  // Update student scores table
  displayStudentScores();

  // Display an alert view
  showAlert('Course Deleted', 'The course has been deleted successfully.');
}

function editCourse(courseIndex) {
  const course = courses[courseIndex];

  // Prompt the user for the new course name
  const newCourseName = prompt("Enter the new course name:", course.name);

  if (newCourseName) {
    // Update the course name
    course.name = newCourseName;

    // Update the course dropdown
    updateCourseDropdown();

    // Update the attached courses list
    updateAttachedCoursesTable();

    // Update student scores table
  displayStudentScores();

    // Display an alert view
    showAlert("Course Edited", `Course "${newCourseName}" has been edited successfully.`);
  } else {
    // Display an error alert view
    showAlert("Error", "Please enter a valid course name.");
  }
}





// Function to filter courses based on the search input
function filterCourses() {
  const searchCourseInput = document.getElementById("searchCourseInput");
  const searchCourseTerm = searchCourseInput.value.toLowerCase();

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
      course.name.toLowerCase().includes(searchCourseTerm)
  );

  // Update the displayed course table with the filtered results
  updateAttachedCoursesTable(filteredCourses);
}

// Initial update with all courses
updateAttachedCoursesTable();

// Add event listener for the search input
document.getElementById("searchCourseInput").addEventListener("input", filterCourses);


function addStudent() {
  const courseIndex = document.getElementById("courseSelect").value;
  const studentName = document.getElementById("studentName").value;
  const midtermScore = parseFloat(document.getElementById("midtermScore").value);
  const finalScore = parseFloat(document.getElementById("finalScore").value);
  const baseCode = parseInt(document.getElementById("baseCode").value);

  if (studentName && !isNaN(midtermScore) && !isNaN(baseCode)) {
    const grade = calculateGrade(midtermScore, finalScore, baseCode);

    const newStudent = {
      name: studentName,
      midtermScore: midtermScore,
      finalScore: finalScore,
      basecode: baseCode,
      grade: grade,
    };
    if (!students.includes(studentName)) {
      students.push(studentName);
    }
    courses[courseIndex].students.push(newStudent);

    // Update student scores table
    displayStudentScores();

    // Clear input fields
    document.getElementById("studentName").value = "";
    document.getElementById("midtermScore").value = "";
    document.getElementById("finalScore").value = "";

    // Display an alert view
    showAlert(
      "Student Added",
      `Student "${studentName}" has been added to the course successfully.`
    );

    console.log(courses[courseIndex].students)
    // Close the modal
    closeModal("studentModal");
  } else {
    // Display an error alert view
    showAlert("Error", "Please enter student name, midterm score, and final score.");
  }
}

function deleteStudent(courseIndex, studentIndex) {
  // Remove the student at the specified index from the specified course
  courses[courseIndex].students.splice(studentIndex, 1);

  // Update student scores table
  displayStudentScores();

  // Display an alert view
  showAlert("Student Deleted", "The student has been deleted successfully.");
}

function calculateGrade(midtermScore, finalScore, baseCode) {
  // Implement grade calculation based on the provided formula and grading scale
  // Return the calculated letter grade
  // This is a simplified example; you can customize it based on your requirements

  const totalScore = 0.4 * midtermScore + 0.6 * finalScore;

  if (baseCode == 10) {
    // Grade cutoffs for base 10:
    if (totalScore >= 90) {
      return "A";
    } else if (totalScore >= 80) {
      return "B";
    } else if (totalScore >= 70) {
      return "C";
    } else if (totalScore >= 60) {
      return "D";
    } else {
      return "F";
    }
  } else {
    // Grade cutoffs for base 7:
    if (totalScore >= 93) {
      return "A";
    } else if (totalScore >= 85) {
      return "B";
    } else if (totalScore >= 77) {
      return "C";
    } else if (totalScore >= 70) {
      return "D";
    } else {
      return "F";
    }
  }
  displayStudentScores();
}

function updateCourseDropdown() {
  const courseSelect = document.getElementById("courseSelect");
  courseSelect.innerHTML = "";

  courses.forEach((course, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = course.name;
    courseSelect.add(option);
  });
}

function displayStudentScores() {
  addToTableStudent();
  const studentListDiv = document.getElementById("studentList");
  studentListDiv.innerHTML = "";

  // Get the selected course index dynamically
  const courseSelect = document.getElementById("courseSelect");
  const courseIndex = courseSelect.selectedIndex;

  // Check if there is a selected option
  if (courseIndex >= 0) {
    // Get the selected option
    const selectedOption = courseSelect.options[courseIndex];

    // Get the text of the selected option
    const selectedCourseName = selectedOption.text;

    // Log the selected course name to the console (you can use it as needed)
    console.log("Selected Course Name:", selectedCourseName);

    // Get the element by its ID
    const sectionTitleElement = document.getElementById("courseName2");

    // Set the text content of the element
    sectionTitleElement.textContent = selectedCourseName;

    // Create a table to display student scores
    const table = document.createElement("table");
    table.border = "1";

    // Create table headers
    const headers = ["Student Name", "Midterm Score", "Final Score", "BaseCode", "Grade"];
    const headerRow = document.createElement("tr");

    headers.forEach((headerText) => {
      const header = document.createElement("th");
      header.textContent = headerText;
      headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Check if there is a selected course
    if (courseIndex >= 0 && courseIndex < courses.length) {
      // Populate the table with student data
      courses[courseIndex].students.forEach((student, index) => {
        const row = document.createElement("tr");
        const data = [
          student.name,
          student.midtermScore,
          student.finalScore,
          student.basecode,
          student.grade,
        ];

        data.forEach((cellData) => {
          const cell = document.createElement("td");
          cell.textContent = cellData;
          row.appendChild(cell);
        });

        // Add a delete button to each student entry
        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "red";
        deleteButton.onclick = () => deleteStudent(courseIndex, index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // Add an edit button to each student entry
        const editCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.style.backgroundColor = "orange";
        editButton.onclick = () => editStudent(courseIndex, index);
        editCell.appendChild(editButton);
        row.appendChild(editCell);
        table.appendChild(row);
      });
    }

    // Append the table to the studentListDiv
    studentListDiv.appendChild(table);
  }
}



function editStudent(courseIndex, studentIndex) {
  const student = courses[courseIndex].students[studentIndex];

  // Prompt the user for student name, midterm score, and final score
  const name = prompt("Enter the student name:", student.name);
  const midtermScore = prompt("Enter the midterm score:", student.midtermScore);
  const finalScore = prompt("Enter the final score:", student.finalScore);

  // Use a selector for basecode with options 7 and 10
  const basecode = prompt("7 veya 10 seçin: ", 7);

  // Calculate the grade automatically using your calculator function
  const grade = calculateGrade(midtermScore, finalScore, basecode);

  // Update the student data
  student.name = name;
  student.midtermScore = midtermScore;
  student.finalScore = finalScore;
  student.basecode = basecode;
  student.grade = grade;

  // Redisplay the student scores
  
  displayStudentScores();
}

function showAlert(title, message) {
  // Display a simple alert dialog with the provided title and message
  alert(`${title}\n\n${message}`);
}

// Add this JavaScript code to your existing script
function searchStudents() {
  const courseIndex = document.getElementById("courseSelect").value;
  const studentListDiv = document.getElementById("studentList");
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  // Clear previous content
  studentListDiv.innerHTML = "";

  // Create a table to display student scores
  const table = document.createElement("table");
  table.id = "student-list";
  table.border = "1";

  // Create table headers
  const headers = ["Student Name", "Midterm Score", "Final Score", "BaseCode", "Grade"];
  const headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);

  // Populate the table with student data based on the search input
  courses[courseIndex].students.forEach((student, index) => {
    const studentName = student.name.toLowerCase();

    // Check if the student name contains the search input
    if (studentName.includes(searchInput)) {
      const row = document.createElement("tr");
      const data = [
        student.name,
        student.midtermScore,
        student.finalScore,
        student.basecode,
        student.grade,
      ];

      data.forEach((cellData) => {
        const cell = document.createElement("td");
        cell.textContent = cellData;
        row.appendChild(cell);
      });

      // Add a delete button to each student entry
      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.backgroundColor = "red";
      deleteButton.onclick = () => deleteStudent(courseIndex, index);
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      // Add an edit button to each student entry
      const editCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.style.backgroundColor = "orange";
      editButton.onclick = () => editStudent(courseIndex, index);
      editCell.appendChild(editButton);
      row.appendChild(editCell);
      table.appendChild(row);
    }
  });

  // Append the table to the studentListDiv
  studentListDiv.appendChild(table);
}

// Initialize the course dropdown and attached courses list
updateCourseDropdown();
updateAttachedCoursesTable();


function addToTableStudent(){
  let result = {};

  students.map((student) => {
    let studentCourse = [];
    courses.map((course) => {
      const res = course.students.find((item) => item.name == student);
      if (!res) return;
      studentCourse.push({ course: course.name, ...res });
    });
    result = { ...result, [student]: studentCourse };
  });

  let final = {};
  students.map((name) => {
    let totalNot = 0;
    result[name].map((course) => {
      totalNot += course.finalScore;
    });
    final = { ...final, [name]: totalNot / result[name].length };
  });

  allStudents = result
  updateStudentTable();
  console.log("son", result);
  console.log("final", final);
}

// Function to create HTML elements for displaying student information
function displayStudentInfo(studentName, courses) {
  const studentDiv = document.createElement("div");
  studentDiv.innerHTML = `<h3>${studentName}</h3>`;

  const coursesList = document.createElement("ul");
  let totalAverage = 0;

  courses.forEach(course => {
    const listItem = document.createElement("li");
    const midtermWeight = 0.4;
    const finalWeight = 0.6;

    // Calculate the course average
    const courseAverage = (course.midtermScore * midtermWeight) + (course.finalScore * finalWeight);
    totalAverage += courseAverage;

    listItem.textContent = `${course.course}: Midterm - ${course.midtermScore}, Final - ${course.finalScore}, Basecode - ${course.basecode}, Average - ${courseAverage.toFixed(2)}`;
    coursesList.appendChild(listItem);
  });

  // Calculate and display the overall average for all courses
  const overallAverage = totalAverage / courses.length;
  const averageListItem = document.createElement("li");
  averageListItem.textContent = `Overall Average: ${overallAverage.toFixed(2)}`;
  coursesList.appendChild(averageListItem);

  studentDiv.appendChild(coursesList);
  return studentDiv;
}

// Function to update the content of the "studentTable" div
function updateStudentTable() {
  const studentTable = document.getElementById("studentTable");

  // Clear existing content
  studentTable.innerHTML = "";

  // Loop through each student in 'result' and display their information
  for (const [studentName, courses] of Object.entries(allStudents)) {
    const studentInfo = displayStudentInfo(studentName, courses);
    studentTable.appendChild(studentInfo);
  }
}


// Function to filter students based on the search input
function filterStudents2() {
  const searchInput = document.getElementById("searchInput2");
  const searchTerm = searchInput.value.toLowerCase();

  // Filter students based on the search term
  const filteredStudents = Object.entries(allStudents).filter(([studentName]) =>
    studentName.toLowerCase().includes(searchTerm)
  );

  // Update the displayed student table with the filtered results
  updateStudentTable2(filteredStudents);
}

// Function to update the content of the "studentTable" div
function updateStudentTable2(filteredStudents) {
  const studentTable = document.getElementById("studentTable");

  // Clear existing content
  studentTable.innerHTML = "";

  // Loop through each filtered student and display their information
  for (const [studentName, courses] of filteredStudents) {
    const studentInfo = displayStudentInfo(studentName, courses);
    studentTable.appendChild(studentInfo);
  }
}

// Initial update with all students
updateStudentTable2(Object.entries(allStudents));

// Add event listener for the search input
document.getElementById("searchInput2").addEventListener("input", filterStudents2);





// Call the updateStudentTable function to initially populate the student information
updateStudentTable();








