import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import StudentEditModel from './StudentEditModel';
import ViewStudentModal from './ViewStudentModel';
import { DeleteStudentService, getStudentByIdservice, getStudentsService } from '../services/studentService';
import StudentMarksModal from './StudentMarksModel';
import { FaEye, FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [studentModel, setStudentModel] = useState({open:false , data:{}});
  const [viewModel, setViewModel] = useState({open:false, data:{}});
  const [marksModel, setMarksModel] = useState({open:false, data:{}});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const handleEdit = (studentData) => {
    setStudentModel({open:true, data:studentData});
  };
  const handleView = async(studentData) => {
    try{
      const response = await getStudentByIdservice(studentData?.id);
      if(response.status === 200){
        setViewModel({open:true, data:response.data})
      }
      else{
        
      }
    }
    catch(err){
      console.log(err);
    }
  }
   const handleCreateStudent = () =>{
    setStudentModel({open:true , data:{}})
   }
  
   const handleMarksModelClose = () => {
    setMarksModel({open:false, data:{}})
   }

  const handleAddModelClose = () =>{
    setStudentModel({open:false , data:{}});
  }

  const handleViewModelClose = () =>{
    setViewModel({open:false, data:{}})
  }

  const getStudents =async() =>{
     try{
      const studentsres = await getStudentsService({page, pageSize});

      if(studentsres.status === 200){
        setStudents(studentsres.data.assets)
        setTotalCount(studentsres.data.totalRecords);
      }
      else{
        Swal.fire("Something went wrong");
      }
     }
     catch(err){
      console.log(err); 
     }
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  /**
   * Deleting the student record
   * @param {integer} studentId 
   */
  const handleDelete = (studentData) => {
    const studentId = studentData?.id;
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to delete the student record: ${studentData?.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async(result) => {
      if (result.isConfirmed) {
        // Proceed with deleting the student
        const response =await DeleteStudentService(studentId);
        if(response.status === 200){
          getStudents();
          Swal.fire('Deleted!', 'The student has been deleted.', 'success');
        }
        else{
          Swal.fire('Something, Went wrong please try again!')
        }
      }
    });
  };

  useEffect(() => {
    getStudents();
  }, [page, pageSize]);  

  useEffect(()=>{
    getStudents();
  },[])
  return (
    <>
    {studentModel.open && <StudentEditModel open={studentModel.open} handleClose={handleAddModelClose} studentData={studentModel.data} refetch={getStudents}/>}
    {viewModel.open && <ViewStudentModal show={viewModel.open} onHide={handleViewModelClose} student={viewModel.data}/>}
    {marksModel.open && <StudentMarksModal show={marksModel.open} studentId={marksModel.data?.id} onHide={handleMarksModelClose}/>}
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
            <th style={{width:'300px'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>
              <Button variant="warning" onClick={() => handleView(student)}>
                  <FaEye  />
                  {/* View */}
                </Button>
                <Button variant="warning" onClick={() => handleEdit(student)} className="ms-2">
                <FaEdit />
                  {/* Edit */}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student)}
                  className="ms-2"
                >
                  <FaTrash />
                    {/* Del */}
                </Button>
                <Button
                  variant="success"
                  onClick={() => setMarksModel({open:true, data:student})}
                  className="ms-2"
                >
                  <FaPlusCircle />
                    {/* Add Marks */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3">
  <div>
    <label className="me-2">Records per page:</label>
    <select
      value={pageSize}
      onChange={(e) => {
        setPageSize(Number(e.target.value));
        setPage(1); // reset to first page on size change
      }}
      className="form-select d-inline-block w-auto"
    >
      {[1, 2, 5, 10, 15, 20].map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </select>
  </div>

  <div className="d-flex align-items-center">
    <Button
      variant="outline-secondary"
      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
      disabled={page === 1}
    >
      Prev
    </Button>

    <span className="mx-3">
      Page {page} of {totalPages}
    </span>

    <Button
      variant="outline-secondary"
      onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
    >
      Next
    </Button>
  </div>
</div>

    </div>
    </>
  );
};

export default StudentTable;
