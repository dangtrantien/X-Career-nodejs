const { workSpaceUpdateValidate } = require("../middleware/Validate.js");
const WorkSpaceModel = require("../DAL/model/WorkSpaceModel");

const workspaceModel = new WorkSpaceModel();

// id, userid,workSpacename
class WorkSpaceController {
  createWorkSpace = async (req, res) => {
    const newWorkSpace = req.body.newWorkSpace;

    workspaceModel
      .createNew(newWorkSpace)
      .then((data) => res.send(data))
      .catch((err) => {
        throw err;
      });
  };

  getAllWorkSpacesOfAllUsers = async (req, res) => {
    const data = await workspaceModel.userAggregate();
    res.json({ length: data.length, data: data });
  };

  getWorkSpaceByID = async (req, res) => {
    const id = req.query.id;

    const data = await workspaceModel.boardAggregate(id);
    if (data.length > 0) res.json(data);
    else res.json("Workspace dose not exist");
  };

  getWorkSpaceByName = (req, res) => {
    const name = req.body.name;

    workspaceModel
      .findByName(name)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("Workspace dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  updateWorkSpaceById = async (req, res) => {
    const { value, error } = workSpaceUpdateValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;
    const result = await workspaceModel.update(id, value);

    if (result) res.send({ success: true, message: "Succesfully updated" });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteWorkSpaceById = async (req, res) => {
    const id = req.query.id;
    const result = await workspaceModel.delete(id);

    if (result) res.json("Succesfully delete");
    else res.json("Sorry, something went wrong");
  };
}

module.exports = WorkSpaceController;
