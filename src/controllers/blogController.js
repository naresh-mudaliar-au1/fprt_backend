import auth from "../middleware/auth";
import { blogModel } from "../model";
import { inputValidation } from "../validation";

const postBlog = async (req, res) => {
  try {
    const { loggedUser, body } = req;

    const { title, description } = body;

    const validation = inputValidation.blogValidationSchema.validate(body);
    if (validation.error) throw new Error(validation.error);

    const createEvent = new blogModel({
      createdBy: loggedUser._id,
      title,
      description,
    });

    const saveEvent = await createEvent.save();

    saveEvent &&
      res
        .status(200)
        .send({ success: true, message: "Event Added Successfully" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const getUserBlog = async (req, res) => {
  try {
    const { loggedUser } = req;

    const userBlogs = await blogModel
      .find()
      .where("_id")
      .equals(loggedUser._id);

    let blogs = userBlogs;

    if (userBlogs.length == 0) {
      blogs = null;
    }

    res.status(200).send({ success: true, blogs });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

// const getAllBlogs = async (req, res) => {};

const updateBlog = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { _id } = req.body;

    if (!_id) throw new Error("No Event Selected");

    const verifyUser = await auth(authorization);

    let update = {
      ...req.body,
    };
    const updateEvent = await blogModel.findOneAndUpdate({ _id }, update);

    if (!updateEvent) throw new Error("Event Not Found");

    updateEvent &&
      res
        .status(200)
        .send({ success: true, message: "Event Updated Successfully" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

export default { postBlog, getUserBlog, updateBlog };
