window.onload = function() {
  const date = new Date();
  loadScreen(true);
  menuTareas()
  /* changeWeb(1,{year: date.getFullYear()}) */
  changeWeb(3,{year: 2022, month: 11, day: 30})
  setInterval(timer, 100)
  loadScreen(false)
};

const month = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const day = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado']
const menu = document.querySelector('menu');
const currentMoment = document.querySelector('.currentMoment');


function timer(){
  const date = new Date();
  const fix = (e) => e < 10 ? '0'+e : e ;
  let time = `${fix(date.getHours())}:${fix(date.getMinutes())}:${fix(date.getSeconds())}`
  document.querySelector('header.time p').innerText = `${day[date.getDay() ]} ${date.getDate()} de ${month[date.getMonth()]} del ${date.getFullYear()} ${time}`
}

function changeWeb(e,data){
  const date = new Date();
  menu.children[0].setAttribute('onclick',`changeWeb(1,{year: ${date.getFullYear()}})`)
  menu.children[1].setAttribute('onclick',`changeWeb(2,{year: ${date.getFullYear()}, month: ${date.getMonth()}})`)
  menu.children[2].setAttribute('onclick',`changeWeb(3,{year: ${date.getFullYear()}, month: ${date.getMonth()}, day: ${date.getDate()}})`)

  let active = Object.values(menu.children).findIndex(n => n.classList[0] == 'active')
  menu.children[active].classList.remove('active')
  menu.children[e-1].classList.add('active')
  
  const createbtn = document.querySelector('.crearTarea');
  
  /* anual  */
  if(e == 1){
    createbtn.setAttribute('onclick','newGoal(1)')
    currentMoment.innerHTML = `
      <i onclick="changeWeb(1,{year: ${data.year-1}})" class="fa-solid fa-angle-left"></i>
      <h1>${data.year}</h1>
      <i onclick="changeWeb(1,{year: ${data.year+1}})" class="fa-solid fa-angle-right"></i>
    `

    fetch('/goals/year', {
      method: 'POST',
      body: JSON.stringify({
        year: data.year
      }),
      headers:{'Content-Type': 'application/json'}
    })
    .then(r => r.json())
    .then(r => {
      document.querySelector('#goalsToDo header b').innerText = r.anual.filter(n => n.checked == 0).length
    })
  }

  /* menusal */
  if(e == 2){
    createbtn.setAttribute('onclick','newGoal(2)')
    currentMoment.innerHTML = `
      <i onclick="changeWeb(2,{year: ${data.month == 0 ? data.year-1 : data.year}, month: ${data.month == 0 ? 11 : data.month-1}} )" class="fa-solid fa-angle-left"></i>
      <h1>${month[data.month]} del ${data.year}</h1>
      <i onclick="changeWeb(2,{year: ${data.month == 11 ? data.year+1 : data.year}, month: ${data.month == 11 ? 0 : data.month+1}})" class="fa-solid fa-angle-right"></i>
    `

  }

  /* diario */
  if(e == 3){
    createbtn.setAttribute('onclick','newGoal(3)')
    dim = new Date(data.year, data.month+1, 0).getDate();
    dbim = new Date((data.month == 0 ? data.year-1 : data.year), (data.month == 0 ? 12 : data.month), 0).getDate();
    
    currentMoment.innerHTML = `
      <i onclick="changeWeb(3,{year: ${data.month == 0 && data.day == 1 ? data.year-1 : data.year}, month: ${(data.day == 1 ? data.month-1 : data.month) == -1 ? 11 : (data.day == 1 ? data.month-1 : data.month)}, day: ${data.day == 1 ? dbim : data.day-1 }} )" class="fa-solid fa-angle-left"></i>
      <h1>${day[new Date(data.year,data.month,data.day).getDay()]} ${data.day} de ${month[data.month]} del ${data.year}</h1>
      <i onclick="changeWeb(3,{year: ${data.month == 11 && data.day == dim ? data.year+1 : data.year}, month:${data.day == dim ? (data.month == 11 ? 0 : data.month+1) : data.month}, day: ${data.day == dim ? 1 : data.day+1 }})" class="fa-solid fa-angle-right"></i>
    `
  }
}

function menuTareas(){
  fetch('/getTareas',{
    method: 'POST'
  }).then(r => r.json())
  .then(r => {
    if(r.ok){
      document.querySelector('#pAnual').innerHTML = r.anual
      document.querySelector('#pMenusal').innerHTML = r.mensual
      document.querySelector('#pDiario').innerHTML = r.diario
    }
  })
}

function loadScreen(e){
  const loader = document.querySelector('#loadScreen')
  if(e) loader.style.display = 'flex'
  else loader.style.display = 'none'
}