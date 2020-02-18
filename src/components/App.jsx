import React, { useState } from 'react'
import { 
  Container, Row, Col, ButtonToolbar, Button
} from 'react-bootstrap'
import ListProjects from './ListProjects'
import RegisterProject from './RegisterProject'

function App() {
  const [adicionar, setAdicionar] = useState(false)

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center' style={{ margin: '15px 0' }}>
          <Col lg={6}>
            <header>
              <h1>Projetos e Tecnologias</h1>
              <p>
                Diretórios em <code>C:\dev\</code> com linguagens, tecnologias e banco de dados.
              </p>
            </header>
          </Col>
          <Col lg={2}>
            { !adicionar &&
            <ButtonToolbar style={{ margin: '18px 0' }}>
              <Button onClick={() => setAdicionar(true)} variant='dark' size='lg' block>
                Adicionar
              </Button>
            </ButtonToolbar>
            }
            { adicionar &&
            <ButtonToolbar style={{ margin: '18px 0' }}>
              <Button onClick={() => setAdicionar(false)} variant='dark' size='lg' block>
                Voltar
              </Button>
            </ButtonToolbar>
            }
          </Col>
        </Row>
        { !adicionar && <ListProjects /> }
        { adicionar && <RegisterProject /> }
      </Container>
    </div>
  )
}

export default App