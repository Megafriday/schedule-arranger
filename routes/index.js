'use strict';
const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const moment = require('moment-timezone');

/* GET home page. */
router.get('/', (req, res, next) => {
	if (req.user) {
		Schedule.findAll({
			where: {
				createdBy: req.user.id
			},
			order: [['updatedAt', 'DESC']]
		}).then(schedules => {
			schedules.forEach((schedule) => {
				schedule.formattedUpdatedAt = moment(schedule.updatedAt)
					.tz('Asia/Tokyo')
					.format('YYYY/MM/DD HH:mm');
			});
			res.render('index', {
				user: req.user,
				schedules: schedules
			});
		});
	} else {
		res.render('index', {
			user: req.user
		});
	}
});

module.exports = router;
