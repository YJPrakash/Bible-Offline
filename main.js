import {
  enBooksIndex,
  enBible
} from './data/enBible.js';
import {
  taBooksIndex,
  taBible
} from './data/taBible.js';

/*
console.log("Bible - English");
console.log(enBooksIndex);
console.log(enBible);
console.log("Bible - Tamil");
console.log(taBooksIndex);
console.log(taBible);
*/
let createBookList = (e) => {
  let bookIndex;
  if (e === null) {
    bookIndex = taBooksIndex;
  } else if (e.target == lang) {
    if (lang.value == 'en') {
      bookIndex = enBooksIndex;
      lang.value = 'en';
    } else if (lang.value == 'ta') {
      bookIndex = taBooksIndex;
      lang.value = 'ta';
    }
  } else {
    return;
  }
  let selectedIndex = (e === null) ? 0 : book.selectedIndex;

  // book.innerHTML = "";
  book.querySelectorAll('option').forEach(option => {
    book.removeChild(option);
  });
  bookIndex.forEach((bookName, idx) => {
    let option = document.createElement('option');
    option.value = idx + 1;
    option.textContent = bookName;
    book.appendChild(option);
  });
  book.selectedIndex = selectedIndex;
  // if(e.target == lang){
  //   listVerse(e);
  // }
};

let listVerse = (e) => {
  let selectedIndex = book.selectedIndex;

  if (e === null) {
    book.selectedIndex = 0;
  } else if (e.target == lang) {
    if (selectedIndex == -1) {
      book.selectedIndex = 0;
    }
  } else if (e.target == chapter) verse.value = 1;

  selectedIndex = book.selectedIndex;
  let bibleBook = (lang.value == 'en') ? enBible.Book : taBible.Book;
  chapter.max = bibleBook[selectedIndex].Chapter.length;
  let chapter_idx = (Number(chapter.value) > Number(chapter.max)) ? 0 : chapter.value - 1;
  chapter.value = chapter_idx + 1;
  verse.max = bibleBook[selectedIndex].Chapter[chapter_idx].Verse.length;
  let verse_idx = (Number(verse.value) > Number(verse.max)) ? 0 : verse.value - 1;
  verse.value = verse_idx + 1;
  view.textContent = bibleBook[selectedIndex].Chapter[chapter_idx].Verse[verse_idx].Verse;
};

bibleForm.addEventListener('change', createBookList);
bibleForm.addEventListener('change', listVerse);

verse.min = verse.value = 1;
chapter.min = chapter.value = 1;
lang.selectedIndex = 1;
createBookList(null);
listVerse(null);