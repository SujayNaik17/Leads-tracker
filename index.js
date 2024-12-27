// function logout(){
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
    import { getDatabase,
        ref,
        push,
        onValue,
        remove
     } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"


// console.log("Button pressed");

// }

const firebaseConfig = {
    databaseURL:"https://lead-tracker-b840d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

console.log("DB",database)
console.log(firebaseConfig.databaseURL)



const inputEl= document.getElementById("input-el")

const ulEl=document.getElementById("ul-el");

console.log(ulEl)

let deleteBtn= document.getElementById("delete-btn")

// let tabBtn = document.getElementById("tab-btn")

const loge= document.getElementById("input-btn")

// const leadsFromLocalStorage= JSON.parse(localStorage.getItem('myleads'))

// if(leadsFromLocalStorage){
//     myLeads = leadsFromLocalStorage
//     renderleads()
// }

// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]

// tabBtn.addEventListener("click", function (){
//  console.log(tabs)
// })


deleteBtn.addEventListener("click", function() {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})


function deletee(){
    console.log("delete")
}



loge.addEventListener("click", function(){
    push(referenceInDB, inputEl.value )
    inputEl.value=""
    // localStorage.setItem("myleads", JSON.stringify(myLeads))

 
})

onValue(referenceInDB, function(snapshot) {
    console.log(snapshot.val())
    const snapshotDoesExist = snapshot.exists()

    if(snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        console.log(leads)
        renderleads(leads)
    }
    
})

// function renderLead() {
//     let listItem = "<li>" + inputEl.value + "</li>"
//     ulEl.innerHTML += listItem
// }

function renderleads(myLeads) {

    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        console.log('Leads>',myLeads[i])
        // listItems += "<li><a href='"+myLeads[i]+"' target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a target='_blank' href="https://${myLeads[i]}">
                    ${myLeads[i]}
                </a>
            </li>
        `
        // localStorage.setItem(i,myLeads[i])
    }
    console.log("listitem", listItems)
    ulEl.innerHTML = listItems

}