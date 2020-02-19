import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function FormDeleteTech({ onSubmit, techForDelete }) {
  const [setName] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    await onSubmit({
      name: techForDelete
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='name'>
        <Form.Control
          type='text'
          name='name'
          value={techForDelete}
          disabled
          onChange={e => setName(e.target.value)}
        />
      </Form.Group>
      <Button variant='danger' type='submit'>Deletar</Button>
    </Form>
  )
}

export default FormDeleteTech