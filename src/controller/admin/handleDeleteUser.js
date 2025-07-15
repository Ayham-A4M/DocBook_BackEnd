const userModel = require('../../models/userModel');
const AppError = require('../../utils/AppError');
const handleDeleteUser = async (req, res, next) => {
    try {
        const { userId } = req.body;

        if (!userId) { throw new AppError(404, 'no specific user') }
        const deleteResponse = await userModel.findByIdAndDelete(userId);
        if (deleteResponse) {
            return res.status(200).send({ msg: 'user has been deleted' });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleDeleteUser;