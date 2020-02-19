import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { 
  Row, Col, Button, Card, Alert
} from 'react-bootstrap'
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import RegisterTech from './RegisterTech'
import FormRegisterTech from './FormRegisterTech'

function ListProjects() {
  const [projects, setProjects] = useState([])
  const [viewTechs, setViewTechs] = useState({})
  const [alertTechs, setAlertTechs] = useState(false)
  const [techs, setTechs] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [idProjectTech, setIdProjectTech] = useState('')
  
  useEffect(() => {
    async function loadProjects() {
      const res = await api.get('/projects')
      setProjects(res.data)
    }
    loadProjects()
  }, [])

  async function addTech(data) {
    try {
      const res = await api.post(`/projects/${idProjectTech}/techs`, data)
      console.log(res)
      setModalShow(false)
      handleViewTech(true, idProjectTech)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddTech(mostrarModal, id) {
    setModalShow(mostrarModal)
    setIdProjectTech(id)
  }

  async function handleDeleteTech(mostrarModal, id) {
    setModalShow(mostrarModal)
    console.log(id)
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
                        key={tech.id}>
                          {tech.name+' '}
                          <FaWindowClose
                            onClick={() => handleDeleteTech(true, project.id)}
                          />
                      </Button>
                    )
                  }
                  {
                    techs.length !== 0 && !modalShow &&
                    <Button
                      variant='success'
                      style={{ margin: '0 10px', fontWeight: 'bold' }}
                      onClick={() => handleAddTech(true, project.id)}
                      >
                      <FaPlusSquare viewBox='0 30 448 512' />
                    </Button>
                  }
                    <RegisterTech show={modalShow} onHide={() => setModalShow(false)}>
                      <FormRegisterTech onSubmit={addTech} />
                    </RegisterTech>
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
