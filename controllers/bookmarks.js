const express = require("express");
let router = express.Router();

const Bookmark = require('../models').bookmark

router.get("/", async function (req, res) {
  const bookmarks = await Bookmark.findAll();

//   res.render("pages/bookmarks", {
//     //Bookmarks: bookmarks.map(bookList => bookList.dataValues.url) 
//     //Because the table contents are stored in an object inside an array, we need to map.
//     Bookmarks: bookmarks.map(bookList => bookList.url)
//   });
   
	res.render('pages/bookmarks.ejs', { bookmarks: bookmarks });

});

router.post("/", async function (req,res) {

  await Bookmark.create(
    {
      url: req.body.url,
    }
  )

  const bookmarks = await Bookmark.findAll();

  res.render("pages/bookmarks", { bookmarks: bookmarks })
})

router.delete('/:bookmarkId', async (req, res) => {
	console.log('hello');
	console.log(req.params.bookmarkId);
	await Bookmark.destroy({
		where: {
			id: req.params.bookmarkId
		}
	})
	const bookmarks = await Bookmark.findAll();
	res.render("pages/bookmarks", { bookmarks: bookmarks });
})

router.get('/edit/:bookmarkId', async (req, res) => {
	console.log("Lantana's error")
	const bookmarks = await Bookmark.findOne({
		where: {
			id: req.params.bookmarkId
		}
	})
	res.render("pages/oneBookmark", { bookmark: bookmarks});
})

module.exports = router;