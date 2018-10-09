const express = require('express');
const router = express.Router();

const User = require('../../core/db/models/user');
const Utils = require('../../utils/utils');

//@route POST api/users/authenticate
//@desc Create A Post
//@access +
router.post('/authenticate', (req, res) => {
	const user = {
		username: req.body.username,
		password: req.body.password
	};

	User.find(user)
		.then((item, err) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (item.length) {
				Utils.generateJWT();
				return res.status(200).send({ ok: true });
			} else {
				return res.status(401).send({ ok: false, message });
			}
		});
});

module.exports = router;