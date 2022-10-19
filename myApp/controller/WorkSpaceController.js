const { workSpaceUpdateValidate } = require("../middleware/Validate.js");
const WorkSpaceModel = require("../model/WorkSpaceModel.js");
// id, userid,workSpacename
class WorkSpaceController {
    createWorkSpace = async (req, res) => {
        const newWorkSpace = new WorkSpaceModel();
        newWorkSpace.name = req.body.name;
       
        const workSpace = await newWorkSpace.save();
        res.send(workSpace);
    }
    getAllWorkSpaces = (req, res) => {
        WorkSpaceModel.find().exec((err, workSpaces) => {
            if (err) {
                res.send("Khong the lay thong tin workSpaces");
            } else {
                // console.log("Lay thanh cong thong tin tat ca workSpaces");
                // console.log(workSpaces);
                res.json(workSpaces);
            }
        });
    };
    getWorkSpaceById = (req, res) => {
        WorkSpaceModel.find({ _id: req.params.id }).exec((err, workSpace) => {
            if (err) {
                res.send("Khong the lay thong tin workSpace");
            } else {
                // console.log("Lay thanh cong thong tin workSpace");
                // console.log(workSpace);
                res.json(workSpace);
            }
        });
    };
   
    updateWorkSpaceById = (req, res) => {
        const { value, error } = workSpaceUpdateValidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        WorkSpaceModel.findOneAndUpdate(
            { _id: req.params.id },
            value,
            { new: true },
            (err) => {
                if (err) {
                    res.send("Da xay ra loi khi update thong tin");
                } else {
                    res.send("Update thong tin thanh cong");
                }
            }
        );
    };
    deleteWorkSpaceById = (req, res) => {
        WorkSpaceModel.findOneAndDelete({ _id: req.params.id }, (err) => {
            if (err) {
                res.send("Da co loi xay ra khi delete WorkSpace");
            } else {
                res.send("Xoa WorkSpace thanh cong");
            }
        });
    };
  

   
}
module.exports = WorkSpaceController;