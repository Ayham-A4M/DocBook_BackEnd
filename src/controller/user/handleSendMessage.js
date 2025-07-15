
const AppError = require('../../utils/AppError');
const getChatResponse = require('../../utils/gemini');
const handleSendMessage = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) { throw new AppError(400, "no message to send") }
        const chatResponse = await getChatResponse(message);
        if (chatResponse) {
            return res.status(200).send(chatResponse);
        }
    } catch (err) {
        next(err);
    }

}
module.exports = handleSendMessage