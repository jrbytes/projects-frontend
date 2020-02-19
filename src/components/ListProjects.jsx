import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { 
  Row, Col, Card
} from 'react-bootstrap'
import RegisterAndDelete from './RegisterAndDelete'

function ListProjects() {
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    async function loadProjects() {
      const res = await api.get('/projects')
      setProjects(res.data)
    }
    loadProjects()
  }, [])

  return (
    <>
    {
      projects.map(project =>
        <Row className='justify-content-md-center' style={{ margin: '15px 0' }} key={project.id}>
          <Col lg={8}>
            <Card bg='dark' text='white' className='text-center'>
              <Card.Header>{project.name}</Card.Header>
              <Card.Body style={{ paddingBottom: '10px'}}>
                <Card.Title>{project.dirname}</Card.Title>
                <Card.Text><Card.Link href={project.repository}>{project.repository}</Card.Link></Card.Text>
              </Card.Body>

              <RegisterAndDelete
                projectId={project.id}
              />

            </Card>
          </Col>
        </Row>
      )
    }
    </>
  );
}

export default ListProjects