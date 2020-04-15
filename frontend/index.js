
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
    .then(resp => resp.json())
    .then(newDay => {
           const main = document.querySelector("main")
           const containerDiv = document.createElement('div')
           const br = document.createElement("BR")

           main.append(containerDiv)
           containerDiv.classList.add("day-container")
           containerDiv.id = "main-container"
           containerDiv.innerHTML = content   
           const obsInput = document.createElement('input')
           obsInput.type = "text"
           obsInput.id = "observations-form"
           obsInput.placeholder = "New Observation"
        const submitObservation = document.createElement('button')
            submitObservation.id = "observations-button"
            containerDiv.append(obsInput)
            containerDiv.append(submitObservation)
            submitObservation.addEventListener("click", event => {
                Observation.createObservation(newDay, event) //maybe this NEEDS to be an instance function, not class function?
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
                Reflection.createReflection(newDay, event)
            })
        const obsHeader = document.createElement('lh')
            obsHeader.id = `observations-header-${newDay.id}` //id
            obsHeader.innerHTML = "Observations"
            containerDiv.append(obsHeader) 
            obsHeader.append(br)  
        const refHeader = document.createElement('lh')  //append day id here too
            refHeader.id = `reflections-header-${newDay.id}` //id
            refHeader.innerHTML = "Reflections"
            containerDiv.append(refHeader)  

    })
    }
    



class Day {
    constructor(id, date, observations, reflections) {
        this.id = id
        this.date = date 
        this.observations = observations
        this.reflections = reflections
    }

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
            obsHeader.id = `observations-header-${this.id}` 
            obsHeader.innerHTML = "Observations"
            containerDiv.append(obsHeader) 
            obsHeader.append(br)  
        const refHeader = document.createElement('lh')  
            refHeader.id = `reflections-header-${this.id}` 
            refHeader.innerHTML = "Reflections"
            containerDiv.append(refHeader)      
        this.observations.forEach(observation => {
            this.displayObservations(observation)
        })
        this.reflections.forEach(reflection => {
            this.displayReflections(reflection)
        })
    }


    displayObservations(observation) {
        console.log(observation.id)
        const lh = document.getElementById(`observations-header-${this.id}`) 
        const ul = document.createElement('ul') 
        lh.append(ul)
        const observationsLi = document.createElement('li')
        observationsLi.id = `observations-container-${observation.id}`
        ul.append(observationsLi)
        observationsLi.innerHTML = observation.content
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete"
        deleteButton.id = `observation-delete-${observation.id}`
        deleteButton.classList.add('delete')
        observationsLi.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            Observation.deleteObservation(observation, event)
        })
    }

    displayReflections(reflection) {
        const lh = document.getElementById(`reflections-header-${this.id}`)
        const ul = document.createElement('ul')
        lh.append(ul)
        const reflectionsLi = document.createElement('li')
        reflectionsLi.id = `reflections-container-${reflection.id}`
        ul.append(reflectionsLi)
        reflectionsLi.innerHTML = reflection.content
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete"
        deleteButton.id = `reflection-delete-${reflection.id}`
        deleteButton.classList.add('delete')
        reflectionsLi.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            Reflection.deleteReflection(reflection, event)
        })
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
    .then(resp => resp.json())
    .then(newObservation => {
        const lh = document.getElementById(`observations-header-${day.id}`) 
        const ul = document.createElement('ul') 
        lh.append(ul)
        const observationsLi = document.createElement('li')
        observationsLi.id = `observations-container-${newObservation.id}`
        ul.append(observationsLi)
        observationsLi.innerHTML = newObservation.content
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = "Delete"
        deleteButton.id = `observation-delete-${newObservation.id}`
        deleteButton.classList.add('delete')
        observationsLi.append(deleteButton)
        deleteButton.addEventListener("click", event => {
            this.deleteObservation(newObservation, event)
        })
    })
    }

    static deleteObservation(observation, event) {
        fetch(`${OBSERVATIONS_URL}/${observation.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            event.target.parentElement.remove()
        })
    }
}


class Reflection {
    constructor(day, ref) {
        this.day = day.id
        this.content = ref.content
    }

    static createReflection(day, event) {
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
        .then(resp => resp.json())
        .then(newReflection => {
            const lh = document.getElementById(`reflections-header-${day.id}`)
            const ul = document.createElement('ul')
            lh.append(ul)
            const reflectionsLi = document.createElement('li')
            reflectionsLi.id = `reflections-container-${newReflection.id}`
            ul.append(reflectionsLi)
            reflectionsLi.innerHTML = newReflection.content
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = "Delete"
            deleteButton.id = `observation-delete-${newReflection.id}`
            deleteButton.classList.add('delete')
            reflectionsLi.append(deleteButton)
            deleteButton.addEventListener("click", event => {
            this.deleteReflection(newReflection, event)
            })
    })
    }

    static deleteReflection(reflection, event) {
        fetch(`${REFLECTIONS_URL}/${reflection.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            event.target.parentElement.remove()
        })
    }
}