const { default: mongoose } = require("mongoose");
const { Types: { ObjectId } } = mongoose;
// for normal user
const schema = new mongoose.Schema({
    date: { type: Date, required: true },
    doctorId: { type: ObjectId, ref: 'doctor', required: true },
    userId: { type: ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    rate: { type: Number, required: true },
    feeling:{type:String,required:true},
});

const commentModel = mongoose.model('comment', schema, 'comments')
module.exports = commentModel;