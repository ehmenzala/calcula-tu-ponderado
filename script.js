const d = document

const $cursosInput = d.getElementById('no-cursos')
const $fieldset = d.getElementById('grades-section')
const $average = d.getElementById('average')
const $calcBtn = d.getElementById('calc-btn')
const $easterEgg = d.querySelector('.easter-egg')

$cursosInput.addEventListener('input', (e) => {
  const value = parseInt(e.target.value)

  if (value < 0) {
    $easterEgg.classList.remove('hidden') 
    return
  } else {
    $easterEgg.classList.add('hidden')
  }

  if (value > 20) {
    renderNInputs(20)
  } else {
    renderNInputs(value)
  }
})

$calcBtn.addEventListener('click', () => {
  calcAverage($fieldset)
})

function calcAverage ($container) {
  const grades = [...$container.querySelectorAll('[data-grade]')].map($grade => parseFloat($grade.value))
  const credits = [...$container.querySelectorAll('[data-credit]')].map($credit => parseFloat($credit.value))
  let totalGC = 0
  let totalCredits = 0
  
  for (let i = 0; i < grades.length; i++) {
    totalCredits += credits[i]
    totalGC += grades[i] * credits[i]
  }

  let average = (totalGC / totalCredits)

  if(average) {
    let stringAverage = average.toFixed(2)
    $average.value = stringAverage
  }
}

function renderNInputs(n) {
  if ($fieldset.hasChildNodes) $fieldset.innerHTML = ''

  const fragment = d.createDocumentFragment()
  for (let i = 1; i <= n; i++) {
    const $labelGrade = d.createElement('LABEL')
    const $labelCredits = d.createElement('LABEL')
    const $inputGrade = d.createElement('INPUT')
    const $inputCredits = d.createElement('INPUT')
    const $inputBox = d.createElement('DIV')
    const $inputBoxInner1 = d.createElement('DIV')
    const $inputBoxInner2 = d.createElement('DIV')

    $inputBox.classList.add('input-box')
    $inputBoxInner1.classList.add('input-box--inner')
    $inputBoxInner2.classList.add('input-box--inner')

    $labelGrade.setAttribute('for', `grade-${i}`)
    $labelGrade.textContent = `Nota ${i}: `
    $labelCredits.setAttribute('for', `credits-${i}`)
    $labelCredits.textContent = 'Créditos: '
    $inputGrade.type = 'number'
    $inputGrade.id = `grade-${i}`
    $inputGrade.dataset.grade = 'grade'
    $inputCredits.type = 'number'
    $inputCredits.id = `credits-${i}`
    $inputCredits.dataset.credit = 'credit'
        
    $inputBoxInner1.appendChild($labelGrade)
    $inputBoxInner1.appendChild($inputGrade)
    $inputBoxInner2.appendChild($labelCredits)
    $inputBoxInner2.appendChild($inputCredits)
    $inputBox.appendChild($inputBoxInner1)
    $inputBox.appendChild($inputBoxInner2)
    fragment.appendChild($inputBox)
  }

  $fieldset.appendChild(fragment)
}