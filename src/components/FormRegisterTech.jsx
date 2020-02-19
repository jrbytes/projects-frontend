import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function FormRegisterTech({ onSubmit }) {
  const [name, setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    await onSubmit({
      name
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='name'>
        <Form.Control
          type='text'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='Digite uma tecnologia'
          required
        />
      </Form.Group>
      <Button variant='dark' type='submit'>Save</Button>
    </Form>
  )
}

export default FormRegisterTech