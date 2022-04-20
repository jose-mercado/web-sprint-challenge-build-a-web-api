// Write your "projects" router here!
const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')
const {
    validateProjectID,
    validateProject
} = require('./projects-middleware')

router.get('/', (req,res,next)=>{
    Projects.get()
        .then(projects=>{
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectID, (req,res)=>{
    res.json(req.project)    
})

router.post('/', validateProjectID, (req,res,next)=>{
    Projects.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})
router.put('/:id', validateProjectID, validateProject, (req, res, next)=>{
    Projects.update(req.params.id, req.body)
    .then(()=>{
        return Projects.get(req.params.id)
    })
    .then(project=>{
        res.json(project)
    })
    .catch(next)
})
router.delete('/:id', validateProjectID, async (req,res, next)=>{
    try{
        await Projects.remove(req.params.id)
        res.json(req.project)
    }catch(err){
        next(err)
    }
})
router.get('/:id/actions', validateProjectID, async (req, res, next)=>{
    try{
        const action = await Projects.getProjectActions(req.params.id)
        res.json(action)
    }
    catch (err){
        next()
    }
})

module.exports = router