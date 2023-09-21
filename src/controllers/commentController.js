const Comment=require("../models/commentModel");

//=============Add Comment=============================

const addComment = async (req, res) => {
  const { commentDesc, topicId } = req.body;
  const username = req.username;

   if (!commentDesc) {
    return res.status(400).send({ status: false, error: "commentDescription is required" });
  }

  if (!username) {
    return res.status(400).send({ status: false, error: "User username is required" });
  }

  if (!topicId) {
    return res.status(400).send({ status: false, error: "Topic ID is required" });
  }

  try {
    const comment = new Comment({
      commentDesc: commentDesc,
      username: username,
      topicId: topicId,
    });

    await comment.save();

    return res.status(201).send({ status: true, message: 'Comment created successfully', comment });
  } catch (error) {
    return res.status(500).send({ status: false, error: 'Error creating comment', error });
  }
};

//================Delete Comment========================
const deleteComment = async (req, res) => {
  const username = req.username;

  try {
    const deleted = await Comment.deleteMany({ username: username });
    return res.status(200).send({ status: true, message: "Comment deleted successfully", deleted });
  } catch (error) {
    return res.status(500).send({ status: false, error: "Error deleting comment", error });
  }
};

module.exports = { addComment, deleteComment };

