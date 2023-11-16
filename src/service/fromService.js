import { Op } from "sequelize";
import DB from "../DB/connect.js";

const FormService = {
     createForm: async (name, email, phone_number, country, image) => {
          const form = await DB.form.create({
               name,
               email,
               phone_number,
               country,
               image,
          });
          return form;
     },

     getOneForm: async (id) => {
          const form = await DB.form.findByPk(id);

          return form;
     },

     getAllForms: async () => {
          const forms = await DB.form.findAll();

          return forms;
     },

     checks: async (email, phone_number) => {
          const form = await DB.form.findOne({
               where: { [Op.or]: [{ email }, { phone_number }] },
               attributes: { exclude: ['createdAt', 'updatedAt'] },  
          })

          return form;
     }
};


export default FormService;