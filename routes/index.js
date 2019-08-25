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
  res.setHeader('content-Type', 'application/json');
  res.send(JSON.stringify({
    Book: (lang == 'en') ? enBookIndex : taBookIndex
  }));
});
router.get('/chapter', (req, res) => {
  res.setHeader('content-Type', 'application/json');
  res.send(JSON.stringify());
});
router.get('/verses', (req, res) => {
  let {
    lang,
    b,
    c
  } = req.query;
  let bible = (lang == 'en') ? enBible : taBible;
  let book = bible.Book[b];
  res.setHeader('content-Type', 'application/json');
  res.send(JSON.stringify({
    Verse: book.Chapter[c - 1].Verse,
    ChapterMax: book.Chapter.length
  }));
});

module.exports = router;