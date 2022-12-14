const { taskUpdateValidate } = require("../middleware/Validate.js");
const TaskModel = require("../DAL/model/TaskModel");

const taskModel = new TaskModel();

class TaskController {
  createTask = async (req, res) => {
    const newTask = req.body.task;

    taskModel
      .createNew(newTask)
      .then((data) => res.send({ success: true, data: data }))
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  };

  getAllTasksOfAllBoards = async (req, res) => {
    const data = await taskModel.boardAggregate();
    res.json({ length: data.length, data: data });
  };

  getByID = (req, res) => {
    const id = req.query.id;

    taskModel
      .findById(id)
      .then((data) => {
        if (data.length > 0) res.json(data);
        else res.json("Task dose not exist");
      })
      .catch((err) => {
        throw err;
      });
  };

  updateTaskByID = async (req, res) => {
    const { value, error } = taskUpdateValidate(req.body.task);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.query.id;

    const result = await taskModel.update(id, value);

    if (result)
      res.send({ success: true, message: "Succesfully updated", data: result });
    else
      res.send({
        success: false,
        message: "Sorry, something went wrong",
      });
  };

  deleteByID = async (req, res) => {
    const id = req.query.id;
    const result = await taskModel.delete(id);

    if (result) res.json({ success: true, message: "Succesfully delete" });
    else res.json({ success: false, message: "Sorry, something went wrong" });
  };
}

module.exports = TaskController;
