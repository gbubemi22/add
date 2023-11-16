export default function (sequelize, DataTypes) {
     const Form = sequelize.define(
       "form",
       {
         name: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         email: {
           type: DataTypes.STRING,
           allowNull: false,
           unique: true,
        validate: {
          isEmail: true,
        },
         },
         phone_number: {
           type: DataTypes.STRING,
           allowNull: false,
          
           unique: true,
       
         },
         country: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         image: {
          type: DataTypes.STRING,
          allowNull: false,
         }
       },
       {
         freezeTableName: true,
       }
     );
   
     return Form;
   }