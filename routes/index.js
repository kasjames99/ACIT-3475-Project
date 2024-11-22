var express = require('express');  
var router = express.Router();  
var path = require('path');  

let projects = [  
    { title: "Project 1", description: "A brief description of Project 1." },  
    { title: "Project 2", description: "A brief description of Project 2." },  
    { title: "Project 3", description: "A brief description of Project 3." }  
];  

let aboutMeText = "Hello! I'm a passionate developer with experience in building web applications. I love coding and learning new technologies.";  

/* GET home page. */  
router.get('/', function(req, res, next) {  
    const filePath = path.join(__dirname, '../puclic/index.html');
    res.sendFile(filePath, function(err) {  
        if (err) {  
            console.error("Error sending file:", err);  
            next(err);  
        }  
    });  
});  

// API to get projects and about me text  
router.get('/api/projects', (req, res) => {  
    res.json(projects);  
});  

router.get('/api/about', (req, res) => {  
    res.json({ about: aboutMeText });  
});  

// API to update about me text  
router.post('/api/about', (req, res) => {  
    aboutMeText = req.body.about;  
    res.json({ success: true, about: aboutMeText });  
});  

// API to add a new project  
router.post('/api/projects', (req, res) => {  
    const newProject = { title: req.body.title, description: req.body.description };  
    projects.push(newProject);  
    res.json({ success: true, projects });  
});  

module.exports = router;