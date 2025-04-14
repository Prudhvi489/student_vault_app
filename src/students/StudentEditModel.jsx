import React, { useState } from 'react'
import {  Button, Modal, Form } from 'react-bootstrap';
const StudentEditModel = (props) => {
    const { open, handleClose, studentData ={} } = props;
    const initEntity =() =>{
        const {id = 0, name="", age = 0, email = "" } = studentData;
        return {id, name, age, email}
    }
    const [student, setStudent] = useState(()=>initEntity());
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!student.name) errors.name = "Name is required";
        if (!student.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(student.email)) errors.email = "Email is invalid";
        if (!student.age || student.age <= 0) errors.age = "Valid age is required";
      
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({...prev, [name]:value}));
  };

  const handleSaveChanges = async() => {
    try{
        const validateStudent = await validateForm()
        if(!validateStudent) return;
        const { name, email, age, id = 0 } = student
        
    }
    catch(err){
        console.log(err)
    }
  };

  const handleCloseModel = () =>{
    setFormErrors({});
    handleClose();
  }
  return (
    <Modal show={open} onHide={handleCloseModel}>
    <Modal.Header closeButton>
      <Modal.Title>{student?.id ? "Edit Student" : "Add Student"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="studentName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student?.name || ''}
            onChange={handleInputChange}
            isInvalid={!!formErrors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="studentEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={student?.email || ''}
            onChange={handleInputChange}
            isInvalid={!!formErrors.email}
          />
           <Form.Control.Feedback type="invalid">
            {formErrors.email}
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="studentAge" className="mt-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={student?.age || ''}
            onChange={handleInputChange}
            isInvalid={!!formErrors.age}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.age}
            </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default StudentEditModel