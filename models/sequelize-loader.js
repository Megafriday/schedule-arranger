'use strict';
const Sequelize = require('sequelize');
const option = {
	logging: false,
	dialectOptions: {}
};

if (process.env.DATABASE_URL) {
	option.dialectOptions.ssl = {};
	option.dialectOptions.ssl.require = true;
	option.dialectOptions.ssl.rejectUnauthorized = false;
}

const sequelize = new Sequelize(
	process.env.DATABASE_URL || 'postgres://postgres:pass@localhost/schedule_arranger',
	option
);

module.exports = {
	database: sequelize,
	Sequelize: Sequelize
};