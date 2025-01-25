import React, { useState, useEffect } from "react";
import AddStudentModal from "./AddStudentModal";  // Import the AddStudentModal component
import { db } from "../firebaseConfig"; // Firebase Firestore
import { collection, getDocs } from "firebase/firestore"; // Firestore methods

const StudentsPage = () => {
  // State for modal visibility
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  // Function to open the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const studentsCollection = collection(db, "students");
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setStudents(studentList);
  };

  useEffect(() => {
    fetchStudents(); // Fetch students when the page loads
  }, []);

  return (
    <div>
      <h2>Students List</h2>
      <button onClick={handleOpenModal}>Add Student</button>

      {/* Add Student Modal */}
      <AddStudentModal open={modalOpen} handleClose={handleCloseModal} />

      {/* Display the students in a table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsPage;
