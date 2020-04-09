
const BASE_URL = "http://localhost:3000"
const DAYS_URL = `${BASE_URL}/days`
const OBSERVATIONS_URL = `${BASE_URL}/observations`
const REFLECTIONS_URL = `${BASE_URL}/reflections`

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
            console.log(newDay)
            newDay.showDay()
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


class Day {
    constructor(id, date, observations, reflections) {
        this.id = id
        this.date = date 
        this.observations = observations
        this.reflections = reflections
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
            submitObservation.addEventListener("click", event => {
                Observation.createObservation(this, event)
            })    
        const refInput = document.createElement('input')
            refInput.type = "text"
            refInput.id = "reflection-form"
            refInput.placeholder = "New Reflection"
        const submitReflection = document.createElement('button')  
            submitReflection.id = "reflections-button"
            containerDiv.append(refInput)
            containerDiv.append(submitReflection)
            submitReflection.addEventListener("click", event => {
                Reflection.createReflection(this, event)
            })
        const obsHeader = document.createElement('lh')   
        obsHeader.id = "observations-header"
        obsHeader.innerHTML = "Observations"
        containerDiv.append(obsHeader) 
        obsHeader.append(br)
        const refHeader = document.createElement('lh')  
        refHeader.id = "reflections-header" 
        refHeader.innerHTML = "Reflections"
        containerDiv.append(refHeader) 
        //refHeader.append(br)
        this.getObservations()
        this.getReflections()
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
            let thisReflection = new Reflection(this, ref)
            this.displayReflections(thisReflection)
        })
    }

    displayObservations(observation) {
        const lh = document.getElementById('observations-header') 
        const ul = document.createElement('ul') 
        lh.append(ul)
        const observationsLi = document.createElement('li')
        observationsLi.id = "observations-container"
        ul.append(observationsLi)
        observationsLi.innerHTML = observation.content

    }

    displayReflections(reflection) {
        const lh = document.getElementById('reflections-header')
        const ul = document.createElement('ul')
        lh.append(ul)
        const reflectionsLi = document.createElement('li')
        reflectionsLi.id = "reflections-container"
        ul.append(reflectionsLi)
        reflectionsLi.innerHTML = reflection.content
    }

} 

class Observation {
    constructor(day, obs) {
        this.day = day.id
        this.content = obs.content
    }

    static createObservation(day, event) {
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
    //add li with target value to observations-list id
    }

    //static deleteObservation(day, event)


}


class Reflection {
    constructor(day, ref) {
        this.day = day.id
        this.content = ref.content
    }

    static createReflection(day, event) {
        console.log(event.target.previousSibling)
        const content = event.target.previousSibling.value
        fetch (REFLECTIONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
             body: JSON.stringify({
                 reflection: content,
                 day: day
             })
        })
    }
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