import {
  fetchJSON
} from './fetchData.js';

let navMobile = document.querySelector(".sidenav");
var navMobileM = M.Sidenav.init(navMobile);
navMobile.addEventListener('click', (e) => {
  navMobileM.open();
});

let createBookList = (bookIndex) => {
  let selectedIndex = book.selectedIndex;
  selectedIndex = (selectedIndex == -1) ? 0 : selectedIndex;
  book.querySelectorAll('option').forEach(option => {
    book.removeChild(option);
  });
  navMobile.innerHTML = "";
  bookIndex.forEach((bookName, idx) => {
    let option = document.createElement('option');
    option.value = idx + 1;
    option.textContent = bookName;
    book.appendChild(option);
    let li = document.createElement('li');
    li.setAttribute("value", idx + 1);
    li.classList.add('row');
    li.classList.add('nomargin');
    li.innerHTML = `<i class='material-icons col'>stars</i><div class='col'>${bookName}</div>`;
    navMobile.appendChild(li);
  });
  book.selectedIndex = selectedIndex;
};

let listVerse = (verses) => {
  let verseStr = "";
  chapter.max = verses.ChapterMax;
  verses = verses.Verse;
  // verse.max = verses.length;
  verses.forEach((verse, idx) => {
    // <div class=col><i class='material-icons small'>stars</i>${verse.Verse}</div>
    verseStr += `<div tabIndex='${idx+1}' class='row'>
      <div class=col>${idx+1}. ${verse.Verse}</div>
    </div>`;
  });
  view.innerHTML = verseStr;
};

// verse.min = verse.value = 1;
chapter.min = chapter.value = 1;
lang.selectedIndex = 1;
let processData = () => {
  return fetchJSON(`/book?lang=${lang.value}`, {
      headers: new Headers(),
      method: 'GET',
      async: false
    }).then(data => {
      return data.Book;
    }).then(createBookList)
    .then(() => {
      return fetchJSON(`/verses?lang=${lang.value}&b=${book.selectedIndex}&c=${chapter.value}`, {
        headers: new Headers(),
        method: 'GET',
        async: false
      });
    }).then(listVerse);
};

lang.addEventListener('change', processData);
book.addEventListener('change', processData);
chapter.addEventListener('change', processData);
// verse.addEventListener('change', processData);
// verse.addEventListener('blur', () => {
//   view.querySelector(`div[tabIndex='${verse.value}']`).focus();
// });
// verse.addEventListener('change', () => {
//   verse.blur();
// });
back.addEventListener('click', () => {
  let prevChapter = Number(chapter.value) - 1;
  chapter.value = (chapter.min <= prevChapter) ? prevChapter : chapter.min;
  processData();
});
forward.addEventListener('click', () => {
  let nextChapter = Number(chapter.value) + 1;
  chapter.value = (chapter.max >= nextChapter) ? nextChapter : chapter.max;
  processData();
});
navMobile.addEventListener('click', (e) => {
  if (e.target.tagName == "LI") {
    navMobileM.close();
    book.selectedIndex = Number(e.target.getAttribute("value")) - 1;
    processData();
  } else {
    e.target.parentElement.click();
  }
});
processData();