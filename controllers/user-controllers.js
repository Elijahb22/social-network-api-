const { User, Thought } = require('../models/index')

const userContr =  {
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.sendStatus(200))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
}

module.exports = userContr;