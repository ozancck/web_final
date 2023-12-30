let courses = [];

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}



function addCourse() {
    const courseName = document.getElementById('courseName').value;


    if (courseName) {
        const newCourse = {
            name: courseName,
            students: []
        };

        courses.push(newCourse);

        // Update the course dropdown
        updateCourseDropdown();

        // Update the attached courses list
        updateAttachedCoursesList();

        // Clear input fields
        document.getElementById('courseName').value = '';

        // Display an alert view
        showAlert('Course Added', `Course "${courseName}" has been added successfully.`);

        // Close the modal
        closeModal('courseModal');
    } else {
        // Display an error alert view
        showAlert('Error', 'Please enter course name.');
    }
}

function deleteCourse(index) {
    // Remove the course at the specified index
    courses.splice(index, 1);

    // Update the course dropdown
    updateCourseDropdown();

    // Update the attached courses list
    updateAttachedCoursesList();

    // Update student scores table
    displayStudentScores();

    // Display an alert view
    showAlert('Course Deleted', 'The course has been deleted successfully.');
}

function addStudent() {
    const courseIndex = document.getElementById('courseSelect').value;
    const studentName = document.getElementById('studentName').value;
    const midtermScore = parseFloat(document.getElementById('midtermScore').value);
    const finalScore = parseFloat(document.getElementById('finalScore').value);
    const baseCode = parseInt(document.getElementById('baseCode').value);


    if (studentName && !isNaN(midtermScore) && !isNaN(baseCode)) {
        const grade = calculateGrade(midtermScore, finalScore, baseCode);

        const newStudent = {
            name: studentName,
            midtermScore: midtermScore,
            finalScore: finalScore,
            basecode: baseCode,
            grade: grade
        };

        courses[courseIndex].students.push(newStudent);

        // Update student scores table
        displayStudentScores();

        // Clear input fields
        document.getElementById('studentName').value = '';
        document.getElementById('midtermScore').value = '';
        document.getElementById('finalScore').value = '';

        // Display an alert view
        showAlert('Student Added', `Student "${studentName}" has been added to the course successfully.`);

        // Close the modal
        closeModal('studentModal');
    } else {
        // Display an error alert view
        showAlert('Error', 'Please enter student name, midterm score, and final score.');
    }
}

function deleteStudent(courseIndex, studentIndex) {
    // Remove the student at the specified index from the specified course
    courses[courseIndex].students.splice(studentIndex, 1);

    // Update student scores table
    displayStudentScores();

    // Display an alert view
    showAlert('Student Deleted', 'The student has been deleted successfully.');
}

function calculateGrade(midtermScore, finalScore, baseCode) {
    // Implement grade calculation based on the provided formula and grading scale
    // Return the calculated letter grade
    // This is a simplified example; you can customize it based on your requirements

    const totalScore = 0.4 * midtermScore + 0.6 * finalScore;

    if (baseCode == 10) {
        // Grade cutoffs for base 10:
        if (totalScore >= 90) {
            return 'A';
        } else if (totalScore >= 80) {
            return 'B';
        } else if (totalScore >= 70) {
            return 'C';
        } else if (totalScore >= 60) {
            return 'D';
        } else {
            return 'F';
        }
    } else {
        // Grade cutoffs for base 7:
        if (totalScore >= 93) {
            return 'A';
        } else if (totalScore >= 85) {
            return 'B';
        } else if (totalScore >= 77) {
            return 'C';
        } else if (totalScore >= 70) {
            return 'D';
        } else {
            return 'F';
        }
    }  
    displayStudentScores()
   
}

function updateCourseDropdown() {
    const courseSelect = document.getElementById('courseSelect');
    courseSelect.innerHTML = '';

    courses.forEach((course, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = course.name;
        courseSelect.add(option);
    });
}

function updateAttachedCoursesList() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';

    // Add delete buttons to each course entry
// Add delete buttons to each course entry
courses.forEach((course, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = course.name;

    const deleteButton = document.createElement('button');
    deleteButton.style.backgroundColor = 'red'

    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteCourse(index);

    // Add delete button to the right of the list item
    listItem.appendChild(document.createTextNode(' '));
    listItem.appendChild(deleteButton);

    courseList.appendChild(listItem);
});



}



function displayStudentScores() {
    const courseIndex = document.getElementById('courseSelect').value;
    const studentListDiv = document.getElementById('studentList');

    // Clear previous content
    studentListDiv.innerHTML = '';

    // Create a table to display student scores
    const table = document.createElement('table');
    table.border = '1';

    // Create table headers
    const headers = ['Student Name', 'Midterm Score', 'Final Score', 'BaseCode', 'Grade', 'Actions'];
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Populate the table with student data
    courses[courseIndex].students.forEach((student, index) => {
        const row = document.createElement('tr');
        const data = [student.name, student.midtermScore, student.finalScore, student.basecode, student.grade];

        data.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        // Add a delete button to each student entry
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = 'red'
        deleteButton.onclick = () => deleteStudent(courseIndex, index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

         // Add an edit button to each student entry
         const editCell = document.createElement('td');
         const editButton = document.createElement('button');
         editButton.textContent = 'Edit';

         editButton.style.backgroundColor = 'orange'
         editButton.onclick = () => editStudent(courseIndex, index);
         editCell.appendChild(editButton);
         row.appendChild(editCell);
         table.appendChild(row);
    });

    // Append the table to the studentListDiv
    studentListDiv.appendChild(table);
}

function editStudent(courseIndex, studentIndex) {
    const student = courses[courseIndex].students[studentIndex];
  
    // Prompt the user for student name, midterm score, and final score
    const name = prompt('Enter the student name:', student.name);
    const midtermScore = prompt('Enter the midterm score:', student.midtermScore);
    const finalScore = prompt('Enter the final score:', student.finalScore);
  
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
    const courseIndex = document.getElementById('courseSelect').value;
    const studentListDiv = document.getElementById('studentList');
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Clear previous content
    studentListDiv.innerHTML = '';

    // Create a table to display student scores
    const table = document.createElement('table');
    table.border = '1';

    // Create table headers
    const headers = ['Student Name', 'Midterm Score', 'Final Score', 'BaseCode', 'Grade'];
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    // Populate the table with student data based on the search input
    courses[courseIndex].students.forEach((student, index) => {
        const studentName = student.name.toLowerCase();

        // Check if the student name contains the search input
        if (studentName.includes(searchInput)) {
            const row = document.createElement('tr');
            const data = [student.name, student.midtermScore, student.finalScore, student.basecode, student.grade];

            data.forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });

            // Add a delete button to each student entry
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.backgroundColor = 'red';
            deleteButton.onclick = () => deleteStudent(courseIndex, index);
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

             // Add an edit button to each student entry
             const editCell = document.createElement('td');
             const editButton = document.createElement('button');
             editButton.textContent = 'Edit';
             editButton.style.backgroundColor = 'orange';
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
updateAttachedCoursesList();
