// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectID(req,res,next) {
    try{
    const project = await Project.get(req.params.id)
    if(project){
        req.project = project
        next()
    }else {
        next({
            status: 404,
            message: "No project found"
        })
    }
    }catch(err){
        next
    }
}

function validateProject(req,res,next) {
    try{
        const {name, description} = req.body
        if (!name || !description){
            res.status(400).json({
                message: "Missing valid name or description"
            })
        }else{
            next()
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {
    validateProjectID,
    validateProject
}