import express from 'express'
import { uuid, isUuid } from 'uuidv4'

// const express = require('express')
// const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(express.json())

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /**
  * Tipos de parâmetros
  * 
  * Query Params: Filtros e paginação 
  * Route Params: Identificar recursos (Atualizar/Deletar)
  * Requeste Params: Conteúdo na hora de criar ou editar um recurso(JSON)
  */
const projects = [] 

function logRequests(request, response,next) {
    const {method , url} = request

    const logLabel = `[${method.toUpperCase()}]  ${url}`

    console.time(logLabel)
    next()
    console.timeEnd(logLabel)
}

function validateProjectId(request, response){
    const { id } = request.params
    if(!isUuid(id)){
        return response.status(400).json({erro: 'Invalid project ID'})
    }
    return next()
}
app.use(logRequests)
app.use('/projects/:id',validateProjectId)

app.get('/', (request, response) => {

    return response.json({message: 'Hello World!'})
})

app.get('/projects', (request, response) => {
    return response.json(projects)
})

app.post('/projects', (request, response) => {

    const { title, owner } = request.body
    const project = { id: uuid() ,title, owner }
    projects.push(project)
    return response.json(project)
})

app.put('/projects/:id', (request, response) => {

    const { id } = request.params
    const { title, owner } = request.body
    const projectIndex = projects.findIndex(project => project.id === id)
    if(projectIndex < 0){
        return response.status(400).json({erro:'Project not found'})
    }
    const project = { id,title, owner }
    projects[projectIndex] = project
    return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({erro:'Project not found'})
    }
   
    projects.splice(projectIndex, 1)
    return response.status(204).send()
})
app.listen(3333,() => {
    console.log('🛸 Back-end started!')
})