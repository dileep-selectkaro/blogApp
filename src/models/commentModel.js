const mongoose = require("mongoose");

const CommentTopicSchema = mongoose.Schema({
    commentDesc: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    topicId: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("CommentTopic", CommentTopicSchema);


