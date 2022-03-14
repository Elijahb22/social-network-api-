const Thought = require('../models/thought');
const User = require('../models/user');
const Reaction = require('../models/reaction');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400)
        });
    },
    createThought({ params, body }, res) {
        return Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { username: body.username},
                { $addToSet: { thoughts: _id }},
                { new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with this name'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
        
    },
}

module.exports = thoughtController;