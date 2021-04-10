import React, {useState} from 'react'

import backgroundImg from './assets/back.jpeg'
import Header from './components/Header.jsx'
import './App.css'
function App() {
    const [projects,setProjects] = useState(['Fazer CC', 'Estudar flutter'])

    function handleAddProject(){
        setProjects([...projects,  `Novo projeto ${Date.now()}`])
    }
    return <>
      
        <Header title="Projects"/>
        <img width="400" src={backgroundImg} alt="qw"/>  
        <ul>
            {projects.map(project => <li key={project} >{project}</li>)}
            
        </ul>
        
        <button onClick={handleAddProject}>Adicionar Projeto</button>
        

    </>

}

export default App
