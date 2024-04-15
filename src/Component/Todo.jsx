import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import moment from 'moment'
// import Moment from 'react-moment';


import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Todo = () => {


  // use state for form data

  const [formData, setFormData] = useState({
    s_no: '',
    task: '',
    status: '',
    assign:'',
    due_date: '',
    comp_date: '',
  })






  // const [newUpdate, setUpdate] = useState({
  //   s_no: '',
  //   task: '',
  //   status: '',
  //   due_date: '',
  //   comp_date: '',
  // })
  // update fill data
  const [id, setId] = useState()
  function update(newSno, newTask, newStatus, newDue_date, newComp_date) {
    console.log(newSno, newTask, newStatus, newDue_date, newComp_date);
    setFormData({
      ...formData,
      s_no: newSno,
      task: newTask,
      status: newStatus,
      due_date: newDue_date,
      comp_date: newComp_date,
    })
    setId(newSno)
    handleShow1()
  }

  // handle input values

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  
  // post api

  const handleSubmit = async () => {
    const url = 'http://localhost:5050/api/todo'

    const res = await axios.post(url, formData)
    console.log(res);
    // res.json()
    if (res.status === 200) {
      console.log('Form data submitted:', formData);
      getdata()
      handleClose();
    } else {
      console.log('Error submit data');
    }
  }
//    handle submit for edit
    const  handleSubmit1 =  async (s_no)=> {
      const url =  'http://localhost:5050/api/todo'

      const res = await axios.put(`${url}/${s_no}`,formData)
      console.log(res);
      if (res.status === 200) {
        console.log('Form data submitted:', formData);
        getdata()
        handleClose1();
      } else {
        console.log('Error submit data');
      }
    }

  // delete
  async function deleteData(s_no) {

    let url = 'http://localhost:5050/api/todo';
    let res = await axios.delete(`${url}/${s_no}`);
    console.log(res);
    getdata();

  }

  // put


  const [show, setShow] = useState(false);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  //useState for edit
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [data, setData] = useState([])
  async function getdata() {
    let res = await axios.get('http://localhost:5050/api/todo')

    setData(res.data)
    console.log(res.data);
  }
  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className="position-relative">

      <Container>
        <Navbar expand="xl" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#">Todo list</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Task</Form.Label>
               <Form.Control as="textarea" rows={3} name='task' placeholder="task" value={formData.task} onChange={handleInput} />
              </Form.Group>

              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>task</Form.Label>
                <Form.Control type="text" name='task' value={formData.task} placeholder="task" onChange={handleInput} />
              </Form.Group> */}
            </Row>
            <Row className="mb-3">
              {/* <Form.Select as={Col} controlId="formGridPassword" onChange={handleInput} name='status' value={formData.status}>
                <option>Status</option>
                <option value="Pending">Pending</option>
                <option value="Progress">Progress</option>
                <option value="Complete">Complete</option>
              </Form.Select> */}

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Due date</Form.Label>
                <Form.Control type="date" name='due_date' value={formData.due_date} onChange={handleInput} />
              </Form.Group>
              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Completion date</Form.Label>
                <Form.Control type="date" name='comp_date' value={formData.comp_date} onChange={handleInput} />
              </Form.Group> */}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
          {/* <Button variant="primary">Understood</Button> */}
        </Modal.Footer>
      </Modal>

    
      <Modal
                      show={show1}
                      onHide={handleClose1}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Task</Form.Label>
                         <Form.Control as="textarea" rows={3} name='task' placeholder="task" value={formData.task} onChange=      {handleInput} />
                           </Form.Group>

                            
                          </Row>
                          <Row className="mb-3">
                            <Form.Select as={Col} controlId="formGridPassword" onChange={handleInput} name='status' value={formData.status}>
                              <option>Status</option>
                              <option value="Pending">Pending</option>
                              <option value="Progress">Progress</option>
                              <option value="Complete">Complete</option>
                            </Form.Select>

                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label>Due date</Form.Label>
                              <Form.Control type="date" name='due_date' value={formData.due_date} onChange={handleInput} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridPassword">
                              <Form.Label>Completion date</Form.Label>
                              <Form.Control type="date" name='comp_date' value={formData.comp_date} onChange={handleInput} />
                            </Form.Group>
                          </Row>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose1}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={()=>{handleSubmit1(formData.s_no)}} >Save</Button>
                      </Modal.Footer>
                    </Modal>
      

      <Table striped bordered hover variant='light' className="position-absolute">

        <thead>
          <tr>
            <th>Sno</th>
            <th>Task</th>
            <th>Status</th>
            <th>Assign Date</th>
            <th>Due Date</th>
            <th>Completion Date</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => {
              return (
                <tr>
                  <td>{item.s_no}</td>
                  <td>{item.task}</td>
                  <td>{item.status}</td>
                  <td>{moment(item.ass_date).format('DD-MM-yyyy')}</td>
                  <td>{moment(item.due_date).format('DD-MM-yyyy')}</td>
                  <td>{moment(item.comp_date).format('DD-MM-yyyy')}</td>


                  <td>
                    <Button variant='light' onClick={()=>{update(item.s_no,item.task,item.status,item.due_date,item.comp_date)}} ><EditIcon style={{ color: 'green' }} /></Button>

                    {/* edit modal */}


                    <Button variant='light' onClick={() => { deleteData(item.s_no) }} ><DeleteIcon style={{ color: 'red' }} /></Button>
                  </td>
                </tr>
              )
            })

          }
        </tbody>
      </Table>









    </div>
  )
}

export default Todo