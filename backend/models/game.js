const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        creator: { type: String, required: true },
        rounds: { type: Number, required: true },
        members: { type: Array, required: false },
        started: { type: Boolean, default: false },
        currentRound: { type: Number, default: 1 },
    },
    { timestamps: true }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
