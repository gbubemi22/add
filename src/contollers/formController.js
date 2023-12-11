import NotFoundError from "../errors/not-found.js";
import ConflictError from "../errors/conflict.js";
import FormService from "../service/fromService.js";
import { StatusCodes } from "http-status-codes";
import formSchema from "../validate/formValidator.js";
import  containerClient  from '../config/configSetup.js';

const FormController = {
  create: async (req, res) => {
    const { error } = formSchema.validate(req.body);

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid request body",
        error: error.details[0].message,
      });
    }

    const { name, email, phone_number, country } = req.body;

    const image = req.file;

    const userExists = await FormService.checks(email, phone_number);

    // if user exists, stop the process and return a message
    if (userExists)
      throw new ConflictError(
        `user with email ${email}  or phone ${phone_number} already exists`
      );

        // Upload image to Azure Blob Storage
        const blobName = `${userExists.id}_${Date.now()}_${image.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

         // Set the Content-Type header to indicate that it's an image
       const options = { blobHTTPHeaders: { blobContentType: document.mimetype } };


       await blockBlobClient.upload(image.buffer, image.buffer.length, options);

       
      const documentUrl = image && image.buffer ? blockBlobClient.url : '';

    const newForm = await FormService.createForm(
      name,
      email,
      phone_number,
      country,
      documentUrl
    );

    res.status(StatusCodes.CREATED).json({
      message: `Thank you for Joining`,
      daata: newForm,
    });
  },

  oneForm: async (req, res) => {
    const id = req.params.id;

    const form = await FormService.getOneForm(id);

    if (!form) throw new NotFoundError(`Form ${id} not found`);

    res.status(StatusCodes.OK).json(form);
  },
  allForms: async (req, res) => {
    const forms = await FormService.getAllForms();

    if (!forms || forms.length === 0)
      throw new NotFoundError(`Forms not found`);

    res.status(StatusCodes.OK).json({
      message: `Successful`,
      count: forms.length,
      data: forms,
    });
  },
};

export default FormController;
