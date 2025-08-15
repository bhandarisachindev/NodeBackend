const registerMail=document.getElementById('register-email');
const registerUsername=document.getElementById('register-username');


registerMail?.addEventListener('change',(e)=>{
  console.log(e.target.value);
})

registerUsername?.addEventListener('change',(e)=>{
  console.log(e.target.value);
})