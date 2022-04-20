// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionID(req,res,next) {
    try{
    const action = await Action.get(req.params.id)
    if(action){
        req.action = action
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
async function validateAction(req,res,next) {
    try{
        const {description, notes, completed } = req.body
        if (!notes || !description || completed == null ){
            res.status(400).json({
                message: "Missing valid notes or description"
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
    validateActionID,
    validateAction
}