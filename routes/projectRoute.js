const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
    try {
        const resources = await Project.get()
        console.log("resources", resources);
        console.log(req.query)
        res.status(200).json(resources)
    } catch {
        res.status(500).json({error: "Could not render projects"})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const oneResource = await Project.get(req.params.id)
        console.log("one resource", oneResource);
        if (oneResource) {
            res.status(200).json(oneResource)
        } else {
            res.status(404).send(`<h3>Resource does not exist, try a different id</h3>`)
        }
       
    } catch {
        res.status(500).json({error: "Could not render projects"})
    }
});

router.post('/', async (req, res) => {
    const {name, description} = req.body;
    if (!name || !description) {
    res.status(404).json({error: "Must enter a new and description!"})
    }

    try {
        const newProject = await Project.insert(req.body);
        console.log(newProject)
        if (newProject){
            res.status(201).json(newProject)
            console.log("added successfully", newProject)
        } 
    } catch {
        res.status(500).json({error: "issue with inserting a new project, try again!"})
    }
});

module.exports = router;

