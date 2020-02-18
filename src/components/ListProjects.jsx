import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { 
  Row, Col, Button, Card, Alert, Form, Modal
} from 'react-bootstrap'
import { FaPlusSquare } from 'react-icons/fa'

function ListProjects() {
  const [projects, setProjects] = useState([])
  const [viewTechs, setViewTechs] = useState({})
  const [alertTechs, setAlertTechs] = useState(false)
  const [techs, setTechs] = useState([])
  // const [addTechForm, setAddTechForm] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [addTech, setAddTech] = useState({})

  useEffect(() => {
    async function loadProjects() {
      const res = await api.get('/projects')
      setProjects(res.data)
    }
    loadProjects()
  }, [])

  async function handleAddTech(mostrarModal, id) {
    setModalShow(mostrarModal)
    console.log(id, mostrarModal)
  }

  async function handleViewTech(mostrar, id) {
    setTechs([])
    setAlertTechs(false)
    setViewTechs({mostrar, id: id})
    listTechs(id)
  }
  
  async function listTechs(id) {
    try {
      const res = await api.get(`./projects/${id}/techs`)
      setTechs(res.data)
      if (res.data.length === 0) {
        setAlertTechs(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {
      projects.map(project =>
        <Row className='justify-content-md-center' style={{ margin: '15px 0' }} key={project.id}>
          <Col lg={8}>
            <Card bg='dark' text='white' className='text-center'>
              <Card.Header>{project.name}</Card.Header>
              <Card.Body>
                <Card.Title>{project.dirname}</Card.Title>
                <Card.Text><Card.Link href={project.repository}>{project.repository}</Card.Link></Card.Text>
                <Button 
                  variant='secondary' 
                  onClick={() => handleViewTech(true, project.id)}>
                  Ver tecnologias
                </Button>
              </Card.Body>
              { 
                viewTechs.mostrar && viewTechs.id === project.id &&
                <Card.Footer>
                  {
                    techs.length !== 0 &&
                    techs.map(tech => 
                      <Button 
                        variant='primary'
                        style={{ margin: '0 10px' }}
                        key={tech.id}>{tech.name}
                      </Button>
                    )
                  }
                  {
                    techs.length !== 0 && !modalShow &&
                    <Button
                      variant='success'
                      style={{ margin: '0 10px', fontWeight: 'bold' }}
                    >
                      <FaPlusSquare 
                        viewBox='0 30 448 512'
                        onClick={() => handleAddTech(true, project.id)} />
                    </Button>
                  }
                  {
                    <Modal show={modalShow} onHide={() => setModalShow(false)} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
                      <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>Adicionar uma tecnologia</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group>
                            <Form.Control placeholder='Digite uma tecnologia' />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button>Close</Button>
                      </Modal.Footer>
                    </Modal>
                  }
                  {
                    alertTechs &&
                    <Alert variant='light' style={{margin: '0px'}}>
                      Por favor,{' '}
                      <Alert.Link href='#'>insira</Alert.Link>
                      {' '}as tecnologias!
                    </Alert>
                  }
                </Card.Footer>
              }
            </Card>
          </Col>
        </Row>
      )
    }
    </>
  );
}

export default ListProjects;
