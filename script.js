const d = document

const $cursosInput = d.getElementById('no-cursos')
const $fieldset = d.getElementById('grades-section')
const $average = d.getElementById('average')
const $calcBtn = d.getElementById('calc-btn')

$cursosInput.addEventListener('input', (e) => {
  const courses = parseInt(e.target.value)
  renderNInputs(courses)
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

  let average = (totalGC / totalCredits).toFixed(2)
  $average.value = average
}

function renderNInputs(n) {
  if ($fieldset.hasChildNodes) $fieldset.innerHTML = ''

  const fragment = d.createDocumentFragment()
  for (let i = 1; i <= n; i++) {
    const $labelGrade = d.createElement('LABEL')
    const $labelCredits = d.createElement('LABEL')
    const $inputGrade = d.createElement('INPUT')
    const $inputCredits = d.createElement('INPUT')

    $labelGrade.setAttribute('for', `grade-${i}`)
    $labelGrade.textContent = `Nota ${i}: `
    $labelCredits.setAttribute('for', `credits-${i}`)
    $labelCredits.textContent = 'Créditos: '
    $inputGrade.type = 'text'
    $inputGrade.id = `grade-${i}`
    $inputGrade.dataset.grade = 'grade'
    $inputCredits.type = 'text'
    $inputCredits.id = `credits-${i}`
    $inputCredits.dataset.credit = 'credit'

    fragment.appendChild($labelGrade)
    fragment.appendChild($inputGrade)
    fragment.appendChild($labelCredits)
    fragment.appendChild($inputCredits)
  }

  $fieldset.appendChild(fragment)
}