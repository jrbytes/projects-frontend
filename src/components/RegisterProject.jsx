import React, { useState } from 'react'
import api from '../services/api'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'

function RegisterProject() {
  const [name, setName] = useState('')
  const [dirname, setDirname] = useState('')
  const [repository, setRepository] = useState('')
  const [projectSuccess, setProjectSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const data = { name, dirname, repository }
    try {
      const response = await api.post('/projects', data)
      console.log(response)
      setProjectSuccess(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <Row className='justify-content-md-center' style={{ margin: '15px 0' }}>
      { !projectSuccess &&
      <Col lg={8}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Nome do Projeto</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder='Inserir nome do projeto'>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='dirname'>
            <Form.Label>Nome do Diretório</Form.Label>
            <Form.Control
              type='text'
              name='dirname'
              value={dirname}
              onChange={e => setDirname(e.target.value)}
              placeholder='Inserir nome do diretório'>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='repository'>
            <Form.Label>Link do Repositório</Form.Label>
            <Form.Control
              type='text'
              name='repository'
              value={repository}
              onChange={e => setRepository(e.target.value)}
              placeholder='Inserir link do repositório git'>
            </Form.Control>
          </Form.Group>

          <Button variant='dark' type='submit'>
            Cadastrar Projeto
          </Button>
        </Form>
      </Col>
      }
    </Row>
    {
    projectSuccess &&
    <Row className='justify-content-md-center' style={{ margin: '15px 0' }}>
      <Col lg={8}>
        <Alert variant='success'>Cadastro realizado com sucesso!</Alert>
        <Card bg='dark' text='white' className='text-center'>
          <Card.Header>{name}</Card.Header>
          <Card.Body>
            <Card.Title>{dirname}</Card.Title>
            <Card.Text><Card.Link href={repository}>{repository}</Card.Link></Card.Text>
            <Button variant='secondary'>Adicionar tecnologias</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    }
    </>
  )
}

export default RegisterProject