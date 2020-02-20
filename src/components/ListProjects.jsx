import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { Row, Col } from 'react-bootstrap'
import { Card, Button, Alert } from 'react-bootstrap'
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import RegisterAndDeleteTechModal from './RegisterAndDeleteTechModal'
import FormRegisterTech from './FormRegisterTech'
import FormDeleteTech from './FormDeleteTech'

function ListProjects() {
  const [projects, setProjects] = useState([])
  const [idProjectTech, setIdProjectTech] = useState('')
  const [viewTechs, setViewTechs] = useState({})
  const [alertTechs, setAlertTechs] = useState(false)
  const [techs, setTechs] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [registerOrDelete, setRegisterOrDelete] = useState('')
  const [techForDelete, setTechForDelete] = useState({})
  
  useEffect(() => {
    async function loadProjects() {
      const res = await api.get('/projects')
      setProjects(res.data)
    }
    loadProjects()
  }, [])

  async function addTech(data) {
    console.log(data)
    try {
      const res = await api.post(`/projects/${idProjectTech}/techs`, data)
      console.log(res)
      setModalShow(false)
      handleViewTech(true, idProjectTech)
    } catch (error) {
      console.log(error)
    }
  }

  async function removeTech(data) {
    console.log(data)
    try {
      const res = await api.delete(`/projects/${idProjectTech}/techs`, {data: { name: data.name }})
      console.log(res)
      setModalShow(false)
      handleViewTech(true, idProjectTech)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddTech(mostrarModal, id) {
    setTitleModal('Adicionar uma tecnologia')
    setRegisterOrDelete('register')
    setModalShow(mostrarModal)
    setIdProjectTech(id)
    console.log('Adicionando tech ', id)
  }

  async function handleDeleteTech(mostrarModal, id, tech) {
    setTitleModal('Deseja realmente remover essa tecnologia?')
    setRegisterOrDelete('delete')
    setTechForDelete(tech)
    setModalShow(mostrarModal)
    setIdProjectTech(id)
    console.log('Deletendo tech ',id, tech)
  }

  async function handleViewTech(mostrar, id) {
    setTechs([])
    setAlertTechs(false)
    setViewTechs({mostrar, id: id})
    listTechs(id)
    console.log('Ver tecnologias', mostrar, id)
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
                        style={{ margin: '5px' }}
                        key={tech.id}>
                          {tech.name+' '} {console.log(viewTechs)}
                          <FaWindowClose
                            viewBox='0 30 448 512'
                            onClick={() => handleDeleteTech(true, project.id, tech.name)}
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
                    <RegisterAndDeleteTechModal 
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      title={titleModal}
                      registerOrDelete={registerOrDelete}
                      techForDelete={techForDelete}
                    >
                      { registerOrDelete === 'register' ?
                        <FormRegisterTech onSubmit={addTech} /> :
                        <FormDeleteTech onSubmit={removeTech} />
                      }
                    </RegisterAndDeleteTechModal>
                  {
                    alertTechs &&
                    <Alert variant='light' style={{margin: '0px'}}>
                      Por favor,{' '}
                      <Alert.Link 
                        onClick={() => handleAddTech(true, project.id)}
                      >
                        insira
                      </Alert.Link>
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

export default ListProjects