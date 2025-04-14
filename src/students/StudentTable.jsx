import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import StudentEditModel from './StudentEditModel';
import ViewStudentModal from './ViewStudentModel';
// import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons

const StudentTable = () => {
  // Example student data
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', age: 20, grade: 'A' },
    { id: 2, name: 'Jane Smith', age: 22, grade: 'B' },
    { id: 3, name: 'Alice Johnson', age: 21, grade: 'A' },
  ]);
  const [studentModel, setStudentModel] = useState({open:false , data:{}});
  const [viewModel, setViewModel] = useState({open:false, data:{}});
  const handleEdit = (studentData) => {
    setStudentModel((prev)=>({open:true, data:studentData}))
   
  };
  const handleView = (studentData) => {
    setViewModel({open:true, data:studentData})
  }
   const handleCreateStudent = () =>{
    setStudentModel({open:true , data:{}})
   }
  const handleAddModelClose = () =>{
    setStudentModel({open:false , data:{}});
  }
  const handleDelete = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete the student with ID: ${studentId}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deleting the student
        setStudents(students.filter(student => student.id !== studentId));
        Swal.fire('Deleted!', 'The student has been deleted.', 'success');
      }
    });
  };

  const handleViewModelClose = () =>{
    setViewModel({open:false, data:{}})
  }
  return (
    <>
    {studentModel.open && <StudentEditModel open={studentModel.open} handleClose={handleAddModelClose} studentData={studentModel.data}/>}
    {viewModel.open && <ViewStudentModal show={viewModel.open} onHide={handleViewModelClose} student={viewModel.data}/>}
    <div >
      <h3>Student List</h3>
      <div className="mb-3 d-flex justify-content-end">
            <Button variant="primary" onClick={handleCreateStudent}>
                + Create Student
            </Button>
        </div>
      <Table striped bordered hover sx={{width:'100vw'}}>
        <thead>
          <tr>
            <th style={{width:'300px'}}>Name</th>
            <th style={{width:'100px'}}>Age</th>
            <th style={{width:'300px'}}>Email</th>
            <th style={{width:'200px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
              <Button variant="warning" onClick={() => handleView(student)}>
                  {/* <FaEdit /> */}
                  View
                </Button>
                <Button variant="warning" onClick={() => handleEdit(student)} className="ms-2">
                  {/* <FaEdit /> */}
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.id)}
                  className="ms-2"
                >
                    Del
                  {/* <FaTrash /> */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default StudentTable;
