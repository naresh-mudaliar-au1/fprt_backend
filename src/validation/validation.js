import joi from "joi";
import Joi from "joi";

const blogValidationSchema = Joi.object()
  .keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  })
  .unknown(true);

const userValidationSchema = Joi.object()
  .keys({
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
  })
  .unknown(true);

const passwordValidation = Joi.object()
  .keys({
    password: Joi.string().min(6).required(),
  })
  .unknown(true);

export default {
  blogValidationSchema,
  userValidationSchema,
  passwordValidation,
};
