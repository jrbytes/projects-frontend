import React from 'react'
import { Modal } from 'react-bootstrap'
import FormRegisterTech from './FormRegisterTech'
import FormDeleteTech from './FormDeleteTech'

function RegisterAndDeleteTechModal(props) {

  return (
    <Modal show={props.show} onHide={props.onHide}
      size='lg' aria-labelledby='contained-modal-title-vcenter' centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { props.registerOrDelete === 'register' &&
          <FormRegisterTech
            {...props.children.props}
          />
        }
        { props.registerOrDelete === 'delete' &&
          <FormDeleteTech techForDelete={props.techForDelete}
            {...props.children.props}
          />
        }
      </Modal.Body>
    </Modal>
  )
}

export default RegisterAndDeleteTechModal