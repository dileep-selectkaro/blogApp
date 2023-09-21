const Topic=require("../models/topicModel")

// ================Add Topic=======================
const addTopic = async (req, res) => {
  const { desc, img } = req.body;
  const username = req.username;
  console.log("User",username)

  if (!desc) {
    return res.status(400).send({ status: false, message: "Missing desc" });
  }
  if (!username) {
    return res.status(400).send({ status: false, message: "Missing Username" });
  }
  if (!img) {
    return res.status(400).send({ status: false, message: "Missing img" });
  }

  try {
    const topic = new Topic({
      desc: desc,
      img: img,
      username: username,
    });

    await topic.save();

    return res.status(201).send({ status: true, message: 'Topic created successfully', topic });
  } catch (error) {
    return res.status(500).send({ status: false, error: 'Error creating Topic', error });
  }
};

//==============Delete Topic========================
const deleteTopic = async (req, res) => {
  const username = req.username;

  try {
    const deleted = await Topic.deleteMany({ username: username });
    return res.status(200).send({ status: true, message: "Topic deleted successfully", deleted });
  } catch (error) {
    return res.status(500).send({ status: false, error: "Error deleting Topic", error });
  }
};

module.exports = { addTopic, deleteTopic };

