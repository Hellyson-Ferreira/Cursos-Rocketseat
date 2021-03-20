import React, {useState} from 'react'
import Header from './components/Header.js'
function App() {
    const [projects,setProjects] = useState(['Fazer CC', 'Estudar flutter'])

    function handleAddProject(){
        setProjects([...projects,  `Novo projeto ${Date.now()}`])
    }
    return <>
      
        <Header title="Projects"/>
        <ul>
            {projects.map(project => <li key={project} >{project}</li>)}
        </ul>

        <button style={{color: '#7159C1'}} onClick={handleAddProject}>Adicionar Projeto</button>
        

    </>

}

export default App
