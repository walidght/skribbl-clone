const gameService = require('../services/gameService');

module.exports = class User {
    static async apiCreateGame(req, res, next) {
        const data = req.body;
        if (!data?.code)
            return res.json({ error: 'please provide a room code.' });
        if (data.code === '')
            return res.json({ error: 'room code can not be an empty string.' });
        // check if code exist in db
        const response = await gameService.getRoomByCode(data.code);
        if (response.length === 0) {
            // create room
            const response = await gameService.createRoom({
                creator: data?.creator,
                code: data?.code,
                rounds: data?.rounds,
                members: [data?.creator],
            });

            if (response) {
                return res.json({
                    success: 'room created successfully.',
                    room: response,
                });
            } else {
                return res.json({
                    error: 'something went wrong while creating room.',
                });
            }
        } else {
            return res.json({ error: 'a room with same code already exists.' });
        }
    }
    static async apiJoinGame(req, res, next) {
        const data = req.body;
        if (!data?.code)
            return res.json({ error: 'please provide a room code.' });
        if (data.code === '')
            return res.json({ error: 'room code can not be an empty string.' });
        // check if code exist in db
        const response = await gameService.getRoomByCode(data.code);
        if (response.length > 0) {
            // join room
            const response = await gameService.addMemberToRoom({
                name: data.name,
                code: data.code,
            });

            if (response) {
                return res.json({
                    success: 'room joined successfully.',
                    room: response,
                });
            } else {
                return res.json({
                    error: 'something went wrong while joining room.',
                });
            }
        } else {
            return res.json({
                error: 'room does not exist. please try another code.',
            });
        }
    }
    static async apiStartGame(req, res, next) {
        const { name, code } = req.body;
        const response = await gameService.getRoomByCode(code);
        if (response[0].creator === name) {
            const response = await gameService.startGame(code);
            if (response) {
                res.json({ success: 'game started succefully.' });
            } else {
                res.json({
                    error: 'could not start game. something went wrong.',
                });
            }
        } else {
            res.json({ error: 'could not start game. access denied.' });
        }
    }
    static async apiGetGame(req, res, next) {
        const code = req.params.code;
        const response = await gameService.getRoomByCode(code);
        console.log(response);
        res.json({
            success: 'fetched succefully',
            data: response[0],
        });
    }
};
