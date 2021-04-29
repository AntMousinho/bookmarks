const express = require("express");
let router = express.Router();

const Bookmark = require('../models').bookmark

router.get("/", async function (req, res) {
	const bookmarks = await Bookmark.findAll();
	res.render('pages/bookmarks.ejs', { bookmarks: bookmarks });
});

router.post("/", async function (req, res) {

	await Bookmark.create(
		{
			url: req.body.url,
		}
	)

	const bookmarks = await Bookmark.findAll();

	res.render("pages/bookmarks", { bookmarks: bookmarks })
})

router.delete('/:bookmarkId', async (req, res) => {
	await Bookmark.destroy({
		where: {
			id: req.params.bookmarkId
		}
	})
	const bookmarks = await Bookmark.findAll();
	res.render("pages/bookmarks", { bookmarks: bookmarks });
})

router.get('/edit/:bookmarkId', async (req, res) => {
	const bookmarks = await Bookmark.findOne({
		where: {
			id: req.params.bookmarkId
		}
	})
	res.render("pages/oneBookmark", { bookmark: bookmarks });
})

router.put('/:bookmarkId', async (req, res) => {
	await Bookmark.update({ url: req.body.updateUrl }, {
		where: {
			id: req.params.bookmarkId
		}
	})
	const bookmarks = await Bookmark.findAll();
	res.render("pages/bookmarks", { bookmarks: bookmarks });
})

module.exports = router;