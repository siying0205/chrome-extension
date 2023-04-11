const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const clearBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

let myLeads = []

// Save the leads to localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

// clear button
clearBtn.addEventListener('click', function () {
  if (confirm('Are you sure you want to delete all your leads?')) {
    localStorage.clear()
    myLeads = []
    render(myLeads)
  }
})

// save button
inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads)
})

// save tab button
tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
  })
})

//  Render the leads to the DOM
function render(leads) {
  let listItems = ''
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
      <a target='_blank' href='${leads[i]}'> ${leads[i]}</a>
    </li>
    `
  }
  ulEl.innerHTML = listItems
}