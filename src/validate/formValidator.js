import Joi from "joi";

const formSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  phone_number: Joi.string().required(),
  country: Joi.string().required(),
  //image: Joi.string().required(),
});

export default formSchema;
