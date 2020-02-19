import React, { useState } from 'react'
import api from '../services/api'
import { Card, Button, Alert } from 'react-bootstrap'
import { FaPlusSquare, FaWindowClose } from 'react-icons/fa'
import RegisterAndDeleteTechModal from './RegisterAndDeleteTechModal'
import FormRegisterTech from './FormRegisterTech'
import FormDeleteTech from './FormDeleteTech'

function RegisterAndDelete({ projectId }) {
  const [idProjectTech, setIdProjectTech] = useState('')
  const [viewTechs, setViewTechs] = useState({})
  const [alertTechs, setAlertTechs] = useState(false)
  const [techs, setTechs] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [registerOrDelete, setRegisterOrDelete] = useState('')
  const [techForDelete, setTechForDelete] = useState({})

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
      <Card.Body style={{ padding: '0 0 20px 0', margin: '0px' }}>
        <Button 
          variant='secondary' 
          onClick={() => handleViewTech(true, projectId)}>
          Ver tecnologias
        </Button>
      </Card.Body>
    { 
      viewTechs.mostrar && viewTechs.id === projectId &&
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
                  onClick={() => handleDeleteTech(true, projectId, tech.name)}
                />
            </Button>
          )
        }
        {
          techs.length !== 0 && !modalShow &&
          <Button
            variant='success'
            style={{ margin: '0 10px', fontWeight: 'bold' }}
            onClick={() => handleAddTech(true, projectId)}
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
              onClick={() => handleAddTech(true, projectId)}
            >
              insira
            </Alert.Link>
            {' '}as tecnologias!
          </Alert>
        }
      </Card.Footer>
    }
    </>
  )
}

export default RegisterAndDelete