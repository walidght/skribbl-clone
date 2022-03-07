const Game = require('../models/game');

module.exports = class GameService {
    static async getRoomByCode(code) {
        const game = await Game.find({ code: code }).exec();
        return game;
    }
    static async createRoom(data) {
        const game = new Game(data);
        return await game.save();
    }
    static async addMemberToRoom({ name, code }) {
        const game = await Game.find({ code: code }).exec();
        game[0].members.push(name);
        const response = await Game.findOneAndUpdate(
            { code, code },
            { members: game[0].members },
            { returnDocument: 'after' }
        ).exec();
        return response;
    }
    static async startGame(code) {
        const response = await Game.findOneAndUpdate(
            { code, code },
            { started: true },
            { returnDocument: 'after' }
        ).exec();
        return response;
    }
};
