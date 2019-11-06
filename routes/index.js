const express = require('express');
const router = express.Router();
const {
  enBookIndex,
  enBible
} = require('../data/enBible');
const {
  taBookIndex,
  taBible
} = require('../data/taBible');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/book', (req, res) => {
  let {
    lang
  } = req.query;
  res.json({
    Book: (lang == 'en') ? enBookIndex : taBookIndex
  });
});

router.get('/chapter', (req, res) => {
  res.json(req.query);
});

router.get('/verses', (req, res) => {
  let {
    lang,
    b,
    c
  } = req.query;
  let bible = (lang == 'en') ? enBible : taBible;
  let book = bible.Book[b];
  res.json({
    Verse: book.Chapter[c - 1].Verse,
    ChapterMax: book.Chapter.length
  });
});

module.exports = router;