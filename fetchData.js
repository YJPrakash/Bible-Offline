export let fetchJSON = (url, options) => {
  return fetch(url, options).then(res => {
    // console.log(res);
    return res.json();
  });
}