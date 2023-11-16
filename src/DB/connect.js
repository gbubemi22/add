// Import packages
import fs from 'fs';
import path from 'path';
import { Sequelize, Op, DataTypes } from 'sequelize';

// Import configs
import config from '../config/configSetup.js';

const currentModuleURL = new URL(import.meta.url);
const currentModuleDir = path.dirname(currentModuleURL.pathname);


let db = {};
const sequelize = new Sequelize(config.DBNAME, config.DBUSERNAME, config.DBPASSWORD || ";m$k8~yWW)_F", {
	host: config.DBHOST,
	dialect: "mysql",
	port: config.DBPORT,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
  logging: true,
});

db.Op = Op;

// load models

const modelFiles = fs.readdirSync(path.join(currentModuleDir, '../models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js');

for (const file of modelFiles) {
  const modelDef = await import(path.join(currentModuleDir, '../models', file));
  const model = modelDef.default(sequelize, DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
}


//Sync Database
sequelize
	.sync()
	.then(async function () {
		console.log('DB CONNECTED ')
	})
	.catch(function (err) {
		console.log(err, 'Something went wrong with the Database Update!');
	});

// exports
db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;