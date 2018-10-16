const express = require('express');
const router = express.Router();

const User = require('../../core/db/models/user');
const Utils = require('../../utils/utils');

//@route POST api/users/authenticate
//@desc Create A Post
//@access +
router.post('/authenticate', (request, response) => {
	const user = {
		username: request.body.username,
		password: request.body.password
	};

	User.find(user)
		.then((item, err) => {
			if (err) {
				return response.status(500).send(err);
			}
			if (item.length) {
				let token = Utils.generateJWT();
				return response.status(200).send({token});
			} else {
				return response.status(401).send('Username or password is incorrect');
			}
		});
});

//@route POST api/users/register
//@desc Create A Post
//@access +
router.post('/register', (request, response) => {
	const user = new User({
		username: request.body.username,
		password: request.body.password
	});

	user.save()
		.then(reuslt => response.json(reuslt));
});

module.exports = router;