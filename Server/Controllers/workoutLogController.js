const router = require('express').Router();
const WorkoutLog = require('../db').import('../Models/workoutLog');
const validateSession = require('../Middleware/validateSession');
const workoutLog = require('../Models/workoutLog');

// Create a workout log with descriptions, definitions, results, and owner properties.
// POST /log/
router.post('/', validateSession, (req, res) => {
    const workoutLog = {
        description: req.body.workoutLog.description,
        definition: req.body.workoutLog.definition,
        result: req.body.workoutLog.result,
        owner: req.user.id
    };

    WorkoutLog.create(workoutLog)
        .then(workoutLog => res.status(200).json(workoutLog))
        .catch(err => res.status(500).json(err));
});

// Get all logs for an individual user.
// GET /log/
router.get('/', validateSession, (req, res) => {
    let userId = req.user.id;

    WorkoutLog.findAll({where: {id: userId}})
        .then(workoutLogs => res.status(200).json(workoutLogs))
        .catch(err => res.status(500).json(err));
});

// Get individual logs by id for an individual user.
// GET /log/:id
router.get('/:id', validateSession, (req, res) => {
    // let userId = req.user.id;

    // WorkoutLog.findAll({where: {id: userId}})
    //     .then(workoutLogs => res.status(200).json(workoutLogs))
    //     .catch(err => res.status(500).json(err));
    const query = {where: {id: req.params.id, owner: req.user.id}};

    WorkoutLog.findOne(query)
        .then(workoutLog => res.status(200).json(workoutLog))
        .catch(err => res.status(500).json(err));
});

// Allow individual logs to be updated by a user.
// PUT /log/:id
router.put('/:id', validateSession, (req, res) => {
    const updatedWorkoutLog = {
        description: req.body.workoutLog.description,
        definition: req.body.workoutLog.definition,
        result: req.body.workoutLog.result
    };

    const query = {where: {id: req.params.id, owner: req.user.id}};

    WorkoutLog.update(updatedWorkoutLog, query)
        .then(workoutLog => res.status(200).json(workoutLog))
        .catch(err => res.status(500).json(err));
});

// Allow individual logs to be deleted by a user.
// DELETE /log/:id
router.delete('/:id', validateSession, (req, res) => {
    const query = {where: {id: req.params.id, owner: req.user.id}};

    WorkoutLog.destroy(query)
        .then(() => res.status(200).json({message: 'Workout log removed'}))
        .catch(err => res.status(500).json(err));
});


module.exports = router;