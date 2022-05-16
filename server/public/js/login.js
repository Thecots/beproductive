const form = document.querySelector('form')
const username = document.querySelector('#username')
const passwd = document.querySelector('#passwd')

form.addEventListener('submit', e => {
  e.preventDefault()

  form.children[0].classList.remove('error')
  form.children[1].classList.remove('error')

  fetch('/login',{
    method: 'POST',
    body: JSON.stringify({
      username: username.value,
      passwd: passwd.value
    }),
    headers: {'Content-Type':'application/json'} 
  }).then(r => r.json())
  .then(r => {
    if(r.ok){
      document.cookie = `session=${r.token}; expires=Thu, 18 Dec 2050 12:00:00 UTC; path=/`;
      window.location.href = '/';
    }else{
      console.log(1);
      form.children[0].classList.add('error')
      form.children[1].classList.add('error')
    }
  })
})