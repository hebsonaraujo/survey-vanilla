let question = document.getElementById('pergunta')
let progress = document.getElementById('progress')
let answers = document.getElementById('respostas')
let btn = document.getElementById('btn-pass')
let qform = document.querySelector('.questions-form')

let arrAnswers = [];
let contador = 0;

setDataInHTML()
listenOptions()
callEvent()
// nextPage()

/**
 * 
 */
function hasNext() {  
  return contador < data.length;
}
/**
 * 
 */
function setDataInHTML() {
  if (hasNext()) {
    progress.innerHTML = data[contador].numero + '/' + data.length;
    question.innerHTML = data[contador].pergunta;
    answers.innerHTML = this.getAnswers(data[contador].respostas);
    answers.setAttribute('data-question', contador + 1)
    contador++;    
  } else {
    setForm()
  }
}

function listenOptions() {
  let options = document.querySelectorAll('#respostas li')
  // console.log('=======', options)
  options.forEach(el => {
    el.addEventListener('click', (e) => {
      const k = document.getElementsByClassName('fillDot');
      if (k.length != 0) {
        k[0].classList.remove('fillDot')
      }
      e.target.classList.add('fillDot')
      if (btn.disabled == true) btn.disabled = false
    })
  })
}

/**
 * 
 */
function callEvent() {
  const btnActive = document.getElementsByClassName('fillDot');  
  btn.addEventListener('click', e => {    
    if (btnActive.length != 0) {
      nextPage()
      setDataInHTML()
      listenOptions()
    } else {
      btn.disabled = true
    }
  })
}
/**
 * 
 */
function nextPage() {
  let chosenOption = document.getElementsByClassName('fillDot');
  arrAnswers.push(chosenOption[0].dataset.id)
}
/**
 * 
 * @param {*} respostas 
 */
function setForm() {  
  console.log('=======tw', arrAnswers)
  //qform.submit()
}

/**
 * 
 * @param {Arr[]} respostas 
 */
function getAnswers(respostas) {
  return respostas.map((el, idx) => `<li data-id='${++idx}'>${el}</li>`).join('');
}