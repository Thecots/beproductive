window.onload = function() {
  saludo();
  setInterval(timer, 100)
};

const month = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const day = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado']

function timer(){
  const date = new Date();
  const fix = (e) => e < 10 ? '0'+e : e ;
  let time = `${fix(date.getHours())}:${fix(date.getMinutes())}:${fix(date.getSeconds())}`
  document.querySelector('header.time p').innerText = `${day[date.getDay() ]} ${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()} ${time}`
}

function saludo(){
  
}