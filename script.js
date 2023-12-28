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
    const gradingScale = document.getElementById('gradingScale').value;

    if (courseName && gradingScale) {
        const newCourse = {
            name: courseName,
            gradingScale: gradingScale,
            students: []
        };

        courses.push(newCourse);

        // Update the course dropdown
        updateCourseDropdown();

        // Update the attached courses list
        updateAttachedCoursesList();

        // Clear input fields
        document.getElementById('courseName').value = '';
        document.getElementById('gradingScale').value = '';

        // Display an alert view
        showAlert('Course Added', `Course "${courseName}" has been added successfully.`);

        // Close the modal
        closeModal('courseModal');
    } else {
        // Display an error alert view
        showAlert('Error', 'Please enter course name and grading scale.');
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

    if (studentName && !isNaN(midtermScore) && !isNaN(finalScore)) {
        const grade = calculateGrade(midtermScore, finalScore, courses[courseIndex].gradingScale);

        const newStudent = {
            name: studentName,
            midtermScore: midtermScore,
            finalScore: finalScore,
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

function calculateGrade(midtermScore, finalScore, gradingScale) {
    // Implement grade calculation based on the provided formula and grading scale
    // Return the calculated letter grade
    // This is a simplified example; you can customize it based on your requirements
    const totalScore = 0.4 * midtermScore + 0.6 * finalScore;
    if (totalScore >= gradingScale) {
        return 'A';
    } else {
        return 'F';
    }
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
    courses.forEach((course, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = course.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteCourse(index);

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
    const headers = ['Student Name', 'Midterm Score', 'Final Score', 'Grade', 'Actions'];
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
        const data = [student.name, student.midtermScore, student.finalScore, student.grade];

        data.forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        // Add a delete button to each student entry
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteStudent(courseIndex, index);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });

    // Append the table to the studentListDiv
    studentListDiv.appendChild(table);
}

function showAlert(title, message) {
    // Display a simple alert dialog with the provided title and message
    alert(`${title}\n\n${message}`);
}

// Initialize the course dropdown and attached courses list
updateCourseDropdown();
updateAttachedCoursesList();
