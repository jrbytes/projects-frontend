import React from 'react'
import { Modal } from 'react-bootstrap'
import FormRegisterTech from './FormRegisterTech'

function RegisterTech(props) {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Adicionar uma tecnologia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <FormRegisterTech {...props.children.props} />
      </Modal.Body>
    </Modal>
  )
}

export default RegisterTech