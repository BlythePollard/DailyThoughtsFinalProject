
const BASE_URL = "http://localhost:3000"
const DAYS_URL = `${BASE_URL}/days`
const OBSERVATIONS_URL = `${BASE_URL}/observations`

document.addEventListener("DOMContentLoaded", () => {
    fetchDays()
    const button = document.getElementById("new-day-button")
    button.addEventListener("click", event => {
    createDay(event) })
   
})

function fetchDays() {
    fetch(DAYS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(day => {
            let newDay = new Day(day.id, day.date, day.observations, day.reflections)
            //could do show logic here
        })
    })
}

function createDay(event) {
    //event.preventDefault()
    const content = document.getElementById("new-day-info").value
    fetch(DAYS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            day: content
        })
    })
    const main = document.querySelector("main")
    const containerDiv = document.createElement('div')
    main.append(containerDiv)
    containerDiv.classList.add("day-container")
    containerDiv.id = "main-container"
    containerDiv.innerHTML = content   
}

// // const observationsButton = document.getElementById("observations-button")
// // observationsButton.addEventListener("click", event => {
// //     createObservation(event)
// // })

// function createObservation(event) {
//     const content = event.target.previousSibling.value
//     fetch(OBSERVATIONS_URL, {
//         method: "POST", 
//         headers: {
//             "Content-Type": "application/json", 
//         },
//         body: JSON.stringify({
//             observation: content
//         })
//     })
// }



class Day {
    constructor(id, date, observations, reflections) {
        this.id = id
        this.date = date 
        this.observations = observations
        this.reflections = reflections
        this.showDay()
    }
//separate storage of records from how it's getting rendered
    showDay() { 
        const main = document.querySelector("main")
        const containerDiv = document.createElement('div')
        const br = document.createElement("BR")
            main.append(containerDiv)
            containerDiv.classList.add("day-container")
            containerDiv.id = "main-container"
            containerDiv.innerHTML = this.date  
        const obsInput = document.createElement('input')
           obsInput.type = "text"
           obsInput.id = "observations-form"
           obsInput.placeholder = "New Observation"
        const submitObservation = document.createElement('button')
            submitObservation.id = "observations-button"
            containerDiv.append(obsInput)
            containerDiv.append(submitObservation)    
        const refInput = document.createElement('input')
            refInput.type = "text"
            refInput.id = "reflection-form"
            refInput.placeholder = "New Reflection"
        const submitReflection = document.createElement('button')  
            submitReflection.id = "reflections-button"
            containerDiv.append(refInput)
            containerDiv.append(submitReflection)
        this.getObservations()
        this.getReflections()

        // const observationsButton = document.getElementById("observations-button")
        // observationsButton.addEventListener("click", event => {
        // Observation.createObservation(this, event)
        })
    }

    getObservations() {
        const observations = this.observations
        observations.forEach((obs) => {
            let thisObservation = new Observation(this, obs)
            this.displayObservations(thisObservation)
        })
    }

    getReflections() {
        const reflections = this.reflections
        reflections.forEach((ref) => {
            let thisReflection = new Reflection(ref)
            this.displayReflections(thisReflection)
        })
    }

    displayObservations(observation) {
        const containerDiv = document.getElementById('main-container') //big issue here: what happens when we have multiples????? 
        const ul = document.createElement('ul') //this might not happen here, but only happen when we create a new day, then create new obs and refs????
        containerDiv.append(ul)
        const observationsLi = document.createElement('li')
        //observationsLi.classList.add("day-container")
        observationsLi.id = "observations-container"
        containerDiv.append(observationsLi)
        observationsLi.innerHTML = observation.content

    }

    displayReflections(reflection) {
        const containerDiv = document.getElementById('main-container')
        const ul = document.createElement('ul')
        containerDiv.append(ul)
        const reflectionsLi = document.createElement('li')
        //reflectionsLi.classList.add("day-container")
        reflectionsLi.id = "reflections-container"
        containerDiv.append(reflectionsLi)
        reflectionsLi.innerHTML = reflection.content
        //const input = document.createElement('input')
          //  input.type = "text"
        //const submitReflection = document.createElement('button')
        //reflectionsLi.append(input)
    }

} 

class Observation {
    constructor(day, obs) {
        this.day = day.id
        this.content = obs.content
        //this.newObs(day)
    }

    // newObs(day) {
    //     const observationsButton = document.getElementById("observations-button")
    //     observationsButton.addEventListener("click", event => {
    //     this.createObservation(day, event)
    //     })
    // }   

    createObservation(day, event) {
    const content = event.target.previousSibling.value
    fetch(OBSERVATIONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({
            observation: content,
            day: day
        })
    })
}
}

//alright, having same issue with double persistence above--WHERE TO PUT THE EVENT LISTENER?!
//WHAT IF I PUT EVENT LISTENER IN SHOWDAY????


class Reflection {
    constructor(ref) {
        this.content = ref.content
        console.log(ref.content)
    }
}