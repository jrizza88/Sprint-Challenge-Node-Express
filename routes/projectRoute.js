const express = require('express');

const router = express.Router();

const Project = require('../data/helpers/projectModel');

router.get('/', async (req, res) => {
    try {
        const resources = await Project.get(req.query)
        console.log()
    } catch {
        
    }
});

module.exports = router;

