import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { UpdateStudentMarks } from '../services/studentService';
import Swal from 'sweetalert2';

const StudentMarksModal = ({ show, onHide, onSave, studentId }) => {
  const [form, setForm] = useState({ subject: '', marks: '', examName: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when typing
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.marks) newErrors.marks = 'Marks are required';
    else if (isNaN(form.marks) || form.marks < 0) newErrors.marks = 'Enter a valid positive number';
    if (!form.examName) newErrors.examName = 'Exam Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (!validateForm()) return;
    // onSave({ ...form, studentId });
    try{
        const payload = { subject:form.subject, examId:Number(form.examName), studentId, marks:Number(form.marks) };
        const response = await UpdateStudentMarks(payload);
        if(response.status){
            Swal.fire("Marks updated succesfully");
        }
    }
    catch(err){
        console.log(err);
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Marks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              name="subject"
              value={form.subject}
              onChange={handleChange}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="number"
              name="marks"
              value={form.marks}
              onChange={handleChange}
              isInvalid={!!errors.marks}
            />
            <Form.Control.Feedback type="invalid">
              {errors.marks}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Exam Name</Form.Label>
            <Form.Control
                as="select"
                name="examName"
                value={form.examName}
                onChange={handleChange}
                isInvalid={!!errors.examName}
            >
                <option value="">Select Semester</option>
                <option value={1}>1st Sem</option>
                <option value={2}>2nd Sem</option>
                <option value={3}>3rd Sem</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.examName}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentMarksModal;
