const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const clearBtn = document.getElementById('delete-btn')

let myLeads = []

// Save the leads to localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render()
}

// clear button
clearBtn.addEventListener('click', function () {
  if (confirm('Are you sure you want to delete all your leads?')) {
    localStorage.clear()
    myLeads = []
    render()
  }
})

// save button
inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render()
})

//  Render the leads to the DOM
function render() {
  let listItems = ''
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
    <li>
      <a target='_blank' href='${myLeads[i]}'> ${myLeads[i]}</a>
    </li>
    `
  }
  ulEl.innerHTML = listItems
}