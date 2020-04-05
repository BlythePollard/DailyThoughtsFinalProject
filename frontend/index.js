// function fetchDays() {
//     fetch(DAYS_URL)
//     .then(resp => resp.json())
//     .then(json => {
//         json.forEach(day => {
//             addDay(day)
//         })
//     })
// }

// function addDay(day) {
//     console.log(day)
// }
// date 
// reflections
// observations

//OO WAY TO WRITE THIS BELOW?
//make sure i can create a day object & redisplay the data

const BASE_URL = "http://localhost:3000"
const DAYS_URL = `${BASE_URL}/days`

document.addEventListener("DOMContentLoaded", () => {
    fetchDays()
    //Day.showDay() not a function? wtf?
})

function fetchDays() {
    fetch(DAYS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(day => {
            let newDay = new Day(day.id, day.date, day.observations, day.reflections)
        })
    })
}

class Day {
    constructor(id, date, observations, reflections) {
        this.id = id
        this.date = date 
        this.observations = observations
        this.reflections = reflections
        this.showDay()
    }


    showDay() { 
        const main = document.querySelector("main")
        const containerDiv = document.createElement('div')
            main.append(containerDiv)
            containerDiv.classList.add("day-container")
            containerDiv.id = "main-container"
            containerDiv.innerHTML = this.date    
            this.getObservations()
            this.getReflections()
        const button = document.getElementById("new-day-button")
            button.addEventListener("click", event => {
                this.createDay(event)
            })
    }
    

    getObservations() {
        const observations = this.observations
        observations.forEach((obs) => {
            let thisObservation = new Observation(obs)
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
        observationsLi.classList.add("day-container")
        observationsLi.id = "observations-container"
        containerDiv.append(observationsLi)
        observationsLi.innerHTML = observation.content
    }

    displayReflections(reflection) {
        const containerDiv = document.getElementById('main-container')
        const ul = document.createElement('ul')
        containerDiv.append(ul)
        const reflectionsLi = document.createElement('li')
        reflectionsLi.classList.add("day-container")
        reflectionsLi.id = "reflections-container"
        containerDiv.append(reflectionsLi)
        reflectionsLi.innerHTML = reflection.content
    }

    createDay(event) {
        event.preventDefault
        fetch()
    }
} 

class Observation {
    constructor(obs) {
        this.content = obs.content
        console.log(obs.content) 
    }

    createObservation() {

    }

}

class Reflection {
    constructor(ref) {
        this.content = ref.content
        console.log(ref.content)
    }
}