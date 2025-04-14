import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewStudentModal = ({ show, onHide, student }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {student ? (
          <>
            <h5>Name: {student.name}</h5>
            <p>Email: {student.email}</p>
            <p>Age: {student.age}</p>

            <h6 className="mt-4">Exam Scores:</h6>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Exam</th>
                  <th>Marks</th>
                </tr>
              </thead>
              <tbody>
                {student.scores && student.scores.length > 0 ? (
                  student.scores.map((score, idx) => (
                    <tr key={idx}>
                      <td>{score.subject}</td>
                      <td>{score.exam}</td>
                      <td>{score.marks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No scores available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <p>No student selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewStudentModal;
