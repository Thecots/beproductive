window.onload = function() {
  const date = new Date();
  loadScreen(true);
  menuTareas()
  /* changeWeb(1,{year: date.getFullYear()}) */
  changeWeb(1,{year: 2022})
  setInterval(timer, 100)
  loadScreen(false)
};

const month = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const day = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado']
const menu = document.querySelector('menu');
const currentMoment = document.querySelector('.currentMoment');
const main = document.querySelector('section.main');
const formSection = document.querySelector('section.form')

function timer(){
  const date = new Date();
  const fix = (e) => e < 10 ? '0'+e : e ;
  let time = `${fix(date.getHours())}:${fix(date.getMinutes())}:${fix(date.getSeconds())}`
  document.querySelector('header.time p').innerText = `${day[date.getDay() ]} ${date.getDate()} de ${month[date.getMonth()]} del ${date.getFullYear()} ${time}`
}

function changeWeb(e,data){
  menuTareas()
  const date = new Date();
  menu.children[0].setAttribute('onclick',`changeWeb(1,{year: ${date.getFullYear()}})`)
  menu.children[1].setAttribute('onclick',`changeWeb(2,{year: ${date.getFullYear()}, month: ${date.getMonth()}})`)
  menu.children[2].setAttribute('onclick',`changeWeb(3,{year: ${date.getFullYear()}, month: ${date.getMonth()}, day: ${date.getDate()}})`)

  main.style.display = 'grid'
  formSection.style.display = 'none'

  let active = Object.values(menu.children).findIndex(n => n.classList[0] == 'active')
  menu.children[active].classList.remove('active')
  menu.children[e-1].classList.add('active')
  
  const createbtn = document.querySelector('.crearTarea');
  
  document.querySelector('#nocheck').innerHTML = ''
  document.querySelector('#sicheck').innerHTML = ''

  /* anual  */
  if(e == 1){
    createbtn.setAttribute('onclick',`newGoal(1,{year: ${data.year}})`)
    currentMoment.innerHTML = `
      <i onclick="changeWeb(1,{year: ${data.year-1}})" class="fa-solid fa-angle-left"></i>
      <h1>${data.year}</h1>
      <i onclick="changeWeb(1,{year: ${data.year+1}})" class="fa-solid fa-angle-right"></i>
    `

    fetch('/goals/year', {  method: 'POST', body: JSON.stringify({ year: data.year}),headers:{'Content-Type': 'application/json'}})
    .then(r => r.json())
    .then(r => {
      document.querySelector('#goalsToDo header b').innerText = r.noc.length;
      let template = '';
      r.noc.forEach(n => {
        let hd;
        if(n.content == '') hd = ''
        else hd = `<div class="description"><p>${n.content}</p></div>`
        template += `
          <div class="goalBox" id="goal${n.id}">
            <div class='checkedBox' ${date.getFullYear() <= r.year ? `onclick='checkGoal(${n.id},1,{year: ${r.year}, month: 1, day: 1})'` : ""}></div>
            <div class="box">
              <div class="title"><h1>${n.title}</h1></div>
              ${hd}
            </div>
          </div>
        `
      });

      let template2 = '';
      r.sic.forEach(n => {
        let hd;
        if(n.content == '') hd = ''
        else hd = `<div class="description"><p>${n.content}</p></div>`

        template2 += `
        <div class="goalBox" id="goal${n.id}">
            <div class='checkedBox checked' ${date.getFullYear() <= r.year ? `onclick='incheckGoal(${n.id},1,{year: ${r.year}, month: 1, day: 1})'` : ""}>
            <i class="fa-solid fa-check"></i>
            </div>
            <div class="box">
              <div class="title"><h1>${n.title}</h1></div>
              ${hd}
            </div>
          </div>
        `
      })
      
      document.querySelector('#nocheck').innerHTML = template
      document.querySelector('#sicheck').innerHTML = template2
    })
  }

  /* menusal */
  if(e == 2){
    createbtn.setAttribute('onclick',`newGoal(2,{year: ${data.year}, month: ${data.month}})`)
    currentMoment.innerHTML = `
      <i onclick="changeWeb(2,{year: ${data.month == 0 ? data.year-1 : data.year}, month: ${data.month == 0 ? 11 : data.month-1}} )" class="fa-solid fa-angle-left"></i>
      <h1>${month[data.month]} del ${data.year}</h1>
      <i onclick="changeWeb(2,{year: ${data.month == 11 ? data.year+1 : data.year}, month: ${data.month == 11 ? 0 : data.month+1}})" class="fa-solid fa-angle-right"></i>
    `

    fetch('/goals/month', {  method: 'POST', body: JSON.stringify({ year: data.year, month: data.month}),headers:{'Content-Type': 'application/json'}})
    .then(r => r.json())
    .then(r => {
    document.querySelector('#goalsToDo header b').innerText = r.noc.length;
    let template = '';
    r.noc.forEach(n => {
      let hd;
      if(n.content == '') hd = ''
      else hd = `<div class="description"><p>${n.content}</p></div>`
      template += `
        <div class="goalBox" id="goal${n.id}">
          <div class='checkedBox' ${date.getFullYear() <= r.year && date.getMonth() <= r.month ? `onclick='checkGoal(${n.id},2,{year: ${r.year}, month: ${r.month}, day: 1})'` : ""}></div>
          <div class="box">
            <div class="title"><h1>${n.title}</h1></div>
            ${hd}
          </div>
        </div>
      `
    });

    let template2 = '';
    r.sic.forEach(n => {
      let hd;
      if(n.content == '') hd = ''
      else hd = `<div class="description"><p>${n.content}</p></div>`

      template2 += `
      <div class="goalBox" id="goal${n.id}">
          <div class='checkedBox checked' ${date.getFullYear() <= r.year && date.getMonth() <= r.month  ? `onclick='incheckGoal(${n.id},2,{year: ${r.year}, month: ${r.month}, day: 1})'` : ""}>
          <i class="fa-solid fa-check"></i>
          </div>
          <div class="box">
            <div class="title"><h1>${n.title}</h1></div>
            ${hd}
          </div>
        </div>
      `
    })
    
    document.querySelector('#nocheck').innerHTML = template
    document.querySelector('#sicheck').innerHTML = template2
  });
}

  /* diario */
  if(e == 3){
    createbtn.setAttribute('onclick',`newGoal(3,{year: ${data.year}, month: ${data.month}, day: ${data.day}})`)
    dim = new Date(data.year, data.month+1, 0).getDate();
    dbim = new Date((data.month == 0 ? data.year-1 : data.year), (data.month == 0 ? 12 : data.month), 0).getDate();
    
    currentMoment.innerHTML = `
      <i onclick="changeWeb(3,{year: ${data.month == 0 && data.day == 1 ? data.year-1 : data.year}, month: ${(data.day == 1 ? data.month-1 : data.month) == -1 ? 11 : (data.day == 1 ? data.month-1 : data.month)}, day: ${data.day == 1 ? dbim : data.day-1 }} )" class="fa-solid fa-angle-left"></i>
      <h1>${day[new Date(data.year,data.month,data.day).getDay()]} ${data.day} de ${month[data.month]} del ${data.year}</h1>
      <i onclick="changeWeb(3,{year: ${data.month == 11 && data.day == dim ? data.year+1 : data.year}, month:${data.day == dim ? (data.month == 11 ? 0 : data.month+1) : data.month}, day: ${data.day == dim ? 1 : data.day+1 }})" class="fa-solid fa-angle-right"></i>
    `
    fetch('/goals/day', {  method: 'POST', body: JSON.stringify({ year: data.year, month: data.month, day: data.day}),headers:{'Content-Type': 'application/json'}})
    .then(r => r.json())
    .then(r => {
    document.querySelector('#goalsToDo header b').innerText = r.noc.length;
    let template = '';
    r.noc.forEach(n => {
      let hd;
      if(n.content == '') hd = ''
      else hd = `<div class="description"><p>${n.content}</p></div>`
      template += `
        <div class="goalBox" id="goal${n.id}">
          <div class='checkedBox' ${date.getFullYear() <= r.year && date.getMonth() <= r.month && date.getDate() <= r.day ? `onclick='checkGoal(${n.id},3,{year: ${r.year}, month: ${r.month}, day: ${r.day}})'` : ""}></div>
          <div class="box">
            <div class="title"><h1>${n.title}</h1></div>
            ${hd}
          </div>
        </div>
      `
    });

    let template2 = '';
    r.sic.forEach(n => {
      let hd;
      if(n.content == '') hd = ''
      else hd = `<div class="description"><p>${n.content}</p></div>`

      template2 += `
      <div class="goalBox" id="goal${n.id}">
          <div class='checkedBox checked' ${date.getFullYear() <= r.year && date.getMonth() <= r.month && date.getDate() <= r.day ? `onclick='incheckGoal(${n.id},3,{year: ${r.year}, month: ${r.month}, day: ${r.day}})'` : ""}>
          <i class="fa-solid fa-check"></i>
          </div>
          <div class="box">
            <div class="title"><h1>${n.title}</h1></div>
            ${hd}
          </div>
        </div>
      `
    })
    
    document.querySelector('#nocheck').innerHTML = template
    document.querySelector('#sicheck').innerHTML = template2
  });
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

function newGoal(e, data){
  main.style.display = 'none'
  formSection.style.display = 'grid'

  /* anual  */
  if(e == 1){
    let template = `
      <div class="title"><h1>Tarea para el ${data.year}</h1></div>
      <form>
        <section>
          <div class="text-field">
            <input id="ftitle" maxlength="50" type="text" required autofocus> 
            <label class="label">Tarea</label>
          </div>
          <div class="text-field">
            <textarea id="fdescription" maxlength="100" type="text"></textarea>
            <label class="label">Descrición <small style="font-size: 10px;">(opcional)</small></label>
          </div>
          <input hidden id="goaltype" value="${e}">
          <input hidden id="goalyear" value="${data.year}">
          <input hidden id="goalmonth" value="1">
          <input hidden id="goalday" value="1">
          <button type="submit">
            <i class="fa-solid fa-circle-plus"></i>
          </button>
        </section>
      </form>
    `
    formSection.innerHTML = template;
  }

  /* menusal */
  if(e == 2){
    let template = `
    <div class="title"><h1>Tarea para ${month[data.month]} del ${data.year}</h1></div>
    <form>
      <section>
        <div class="text-field">
          <input id="ftitle" maxlength="50" type="text" required autofocus> 
          <label class="label">Tarea</label>
        </div>
        <div class="text-field">
          <textarea id="fdescription" maxlength="100" type="text"></textarea>
          <label class="label">Descrición <small style="font-size: 10px;">(opcional)</small></label>
        </div>
        <input hidden id="goaltype" value="${e}">
        <input hidden id="goalyear" value="${data.year}">
        <input hidden id="goalmonth" value="${data.month}">
        <input hidden id="goalday" value="1">
        <button type="submit">
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </section>
    </form>
  `
  formSection.innerHTML = template;
}

  /* diario */
  if(e == 3){
    let date = new Date(data.year, data.month, data.day)
    
    let template = `
    <div class="title"><h1>Tarea para el ${day[date.getDay()]} ${data.day} de ${month[data.month]} del ${data.year}</h1></div>
    <form>
      <section>
        <div class="text-field">
          <input id="ftitle" maxlength="50" type="text" required autofocus> 
          <label class="label">Tarea</label>
        </div>
        <div class="text-field">
          <textarea id="fdescription" maxlength="100" type="text"></textarea>
          <label class="label">Descrición <small style="font-size: 10px;">(opcional)</small></label>
        </div>
        <input hidden id="goaltype" value="${e}">
        <input hidden id="goalyear" value="${data.year}">
        <input hidden id="goalmonth" value="${data.month}">
        <input hidden id="goalday" value="${data.day}">
        <button type="submit">
          <i class="fa-solid fa-circle-plus"></i>
        </button>
      </section>
    </form>
  `
  formSection.innerHTML = template;
  }


  const form = document.querySelector('form')

  form.addEventListener('submit', e => {
    e.preventDefault()
    let type = document.querySelector('#goaltype').value;
    let title = document.querySelector('#ftitle').value;
    let description = document.querySelector('#fdescription');

    let year = document.querySelector('#goalyear').value
    let month = document.querySelector('#goalmonth').value
    let day = document.querySelector('#goalday').value
    

    fetch('/savegoal', {
      method: 'POST',
      body: JSON.stringify({
        type,
        title,
        description: description.value,
        data: {year, month, day}
      }),
      headers:{'Content-Type': 'application/json'}
    })
    .then(r => r.json())
    .then(r => {
      if(r.type == 1){
        changeWeb(1,{year: parseInt( r.data.year)})
      }
      if(r.type == 2){
        changeWeb(2,{year: parseInt(r.data.year), month: parseInt(r.data.month)})
      }
      if(r.type == 3){
        
        changeWeb(3,{year: parseInt(r.data.year), month: parseInt(r.data.month), day: parseInt(r.data.day)})
      }
    })
       
  })
}

function checkGoal(id, type, data){
  const box = document.querySelector('#nocheck');
  fetch('/check', {  method: 'POST', body: JSON.stringify({id}),headers:{'Content-Type': 'application/json'}})
  .then(r => r.json)
  .then(r => {
    changeWeb(type,{year: data.year, month: data.month, day: data.day})
  })
}

function incheckGoal(id, type, data){
  fetch('/incheck', {  method: 'POST', body: JSON.stringify({id}),headers:{'Content-Type': 'application/json'}})
  .then(r => r.json)
  .then(r => {
    changeWeb(type,{year: data.year, month: data.month, day: data.day})
  })
}

function loadScreen(e){
  const loader = document.querySelector('#loadScreen')
  if(e) loader.style.display = 'flex'
  else loader.style.display = 'none'
}