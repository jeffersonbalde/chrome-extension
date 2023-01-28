const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const tabBtn = document.getElementById("tab-btn")
let myLinks = []

if (leadsFromLocalStorage) {
    myLinks = leadsFromLocalStorage
    render(myLinks)
}

tabBtn.addEventListener("click", () => {    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        render(myLinks)
    })
})  

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += ` 
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", () => {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

inputBtn.addEventListener("click", () => {
    myLinks.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLinks", JSON.stringify(myLinks) )
    render(myLinks)
})