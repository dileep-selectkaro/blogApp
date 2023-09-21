const mongoose = require("mongoose");


const topicSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,

    },
    img: {
        type: String,
        required: true,

    }
});

module.exports = mongoose.model("AddTopic", topicSchema);
