export let fetchJSON = (url)=>{
  fetch(url).then((res)=>{
    // console.log(res);
    return res.json().then(data => {return data});
  });
}