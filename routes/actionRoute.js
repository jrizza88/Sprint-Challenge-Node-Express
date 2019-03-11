const express = require('express');

const router = express.Router();

const Action = require('../data/helpers/actionModel');

const descriptionLimit = (req, res, next) => {
    const stringLimit = req.body.description.length;
    const count = 128;
    if (stringLimit > count) {
        return res.status(404).json({message: 'string limit is 128 characters, trim down please'})
    }
    next();
}

router.get('/', async (req, res) => {
    try {
        const resources = await Action.get()
        console.log("resources", resources);
        console.log(req.query)
        res.status(200).json(resources)
    } catch {
        res.status(500).json({error: "Could not render actions"})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const oneAction = await Action.get(req.params.id)
        console.log("one resource", oneAction);
        if (oneAction) {
            res.status(200).json(oneAction)
        } else {
            res.status(404).send(`<h3>action does not exist, try a different id</h3>`)
        }
       
    } catch {
        res.status(500).json({error: "Could not render the action"})
    }
});


router.post('/', descriptionLimit, async (req, res) => {
    const {description, project_id, notes} = req.body;
    if (!description || !project_id || !notes) {
    res.status(404).json({error: "Must enter a description, note, and project id!"})
    }

    try {
        const newAction = await Action.insert(req.body);
        console.log(newAction)
        if (newAction){
            res.status(201).json(newAction)
            console.log("added successfully", newAction)
        } 
    } catch {
        res.status(500).json({error: "issue with inserting a new action, try again!"})
    }
});

router.put('/:id', async (req, res) => {
    const {description, project_id, notes} = req.body;
    if (!description || !project_id || !notes) {
        res.status(404).json({error: "Must enter a description, note, and project id in order to edit"})
        }

        try {
            const action = req.body;
            const editAction = await Action.update(req.params.id, action);
            console.log(editAction)
            if (editAction){
                res.status(201).json(editAction)
                console.log("Edited:", editAction)
            } 
        } catch {
            res.status(500).json({error: "issue with editing the action, try again!"})
        }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deleteAction = await Action.remove(id)
        res.status(404).json({message: 'Action must have been deleted or never existed!'})

    } catch {
        res.status(500).json({error: 'Server issue prevented delete of user'})
    }
});

module.exports = router;