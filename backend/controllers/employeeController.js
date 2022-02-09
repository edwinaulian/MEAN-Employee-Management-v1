const express = require('express');
var router = express.Router();
var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log("Error in Retriving Employe:" + JSON.stringify(err, undefined, 2));
        }
    });
});

// => localhost:3000/employees/384329432448928
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record given id: ${req.params.id}`);
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log("Error in Retriving Employe:" + JSON.stringify(err, undefined, 2));
        }
    });
})

// => localhost:3000/employees/84932849328493
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record given id: ${req.params.id}`);

    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in Employee Remove" + JSON.stringify(err, undefined, 2));
        }
    })
});

// => localhost:3000/employees/343242434433223
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record given id: ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in Employee Update" + JSON.stringify(err, undefined, 2));
        }
    });
})

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error save data Employee" + JSON.stringify(err, undefined, 2));
        }
    });
})

module.exports = router;