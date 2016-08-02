var request = require('request');

var Page = require('../models/page');


exports.getPage = function(req, res) {
	var page_id = req.params.page_id;
	var criteria = {};
	//Can find message by short URL or DB ID
	if (page_id.match(/^[0-9a-fA-F]{24}$/))
		criteria._id = page_id;
	else
		criteria.shorturl = page_id;

	Page.findOne(criteria, function(err, page) {
		if (!page || err) {
			res.json({
				status: 0,
				"message": 'Error finding message'
			});
		} else {
			var has_cleartext = (page.cleartext !== undefined && page.cleartext !== "");
			var has_encryptedtext = (page.encryptedtext !== undefined && page.encryptedtext !== "")

			var page_data = {};

			page_data.has_cleartext = has_cleartext;
			page_data.cleartext = page.cleartext;
			page_data.has_encryptedtext = has_encryptedtext;
			page_data.encryptedtext = page.encryptedtext;
			page_data.creator_id = page.creator_id;

			if (page.viewed === false)
				page_data.creator_id = page.creator_id;
			else
				page_data.creator_id = "";

			if (page.viewed === false) {
				page.viewed = true;
				page.save(function(err, page) {
					if(!err)
						res.render('page.ejs', {
							page_data
						});
				});
			} else {
				res.render('page.ejs', {
					page_data
				});
			}
		}
	});
}




//exports.getAllPages = function(req, res) {

///}






exports.addNewPage = function(req, res) {

	if (req.method == 'GET') {
		res.render('addpage.ejs');
	} else {
		var secretKey = process.env.GOOGLE_RECAPTCHA_SECRET;

		var cleartext = req.body.cleartext;
		var encryptedtext = req.body.encryptedtext;
		var creator_id = req.body.creator_id;
		var tags = req.body.tags;

		var newPage = Page({
			cleartext: cleartext,
			encryptedtext: encryptedtext,
			creator_id: creator_id
		});

		//		var hashtagData = [];
		//	allHashtags.forEach(function(hashtag) {
		//			var tempHashtagData = {};
		//			tempHashtagData.text = hashtag;
		//			tempHashtagData.user_id = user.local.displayName;
		//			hashtagData.push(tempHashtagData);
		//		});

		var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

		request(verificationUrl, function(error, response, body) {
			body = JSON.parse(body);
			// Success will be true or false depending upon captcha validation.
			if (body.success !== undefined && !body.success) {
				console.log("Failed captcha verification");
				res.json({
					status: 1,
					message: 'Failed captcha verification',
					redirect: ''
				});
			} else {
				newPage.save(function(err) {
					if (err)
						console.log(err);
					else {
						console.log("saved");
						res.json({
							status: 0,
							redirect: newPage.shorturl,
							is_new_page: true
						});
					}
				});
			}
		});
	}
};