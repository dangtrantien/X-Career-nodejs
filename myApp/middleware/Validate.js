const Joi = require("joi");

const userUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().min(10),
    password: Joi.string(),
    avatar: Joi.string().allow(""),
    gender: Joi.string(),
    address: Joi.string(),
  });

  return schema.validate(data);
};

const workSpaceUpdateValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    userID: Joi.string(),
  });

  return schema.validate(data);
};

const boardUpdateValidate = (data) => {
  const schema = Joi.object({
    workSpaceID: Joi.string(),
    name: Joi.string(),
  });

  return schema.validate(data);
};

const taskUpdateValidate = (data) => {
  const schema = Joi.object({
    boardID: Joi.string(),
    describe: Joi.string(),
    status: Joi.number().max(3),
  });

  return schema.validate(data);
};

const commentUpdateValidate = (data) => {
  const schema = Joi.object({
    message: Joi.string(),
    senderID: Joi.string(),
    taskID: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  userUpdateValidate,
  workSpaceUpdateValidate,
  boardUpdateValidate,
  taskUpdateValidate,
  commentUpdateValidate,
};
