import '../styles/css/style.css'
import '../styles/sass/style.scss'
import { nanoid } from 'nanoid'
import createBootstrapAlert from '../helpers/Alert.js'
import isTheInputEmpty from '../helpers/isTheInputEmpty'
import Activity from './Activity'


class ActivityApp {
    constructor () {
        console.log('ActivityApp constructor')

        this.allActivities = []
        this.form = document.querySelector('.main-form')
        this.activityBox = document.querySelector('.tasks-section')
        this.form.addEventListener('submit', (e) => this.handleSubmitActivity(e))
        this.inputActivity = document.getElementById('taskInput')
        this.intensityActivity = document.getElementById('intensity')
        this.frequencyActivity = document.getElementById('frequency')
        this.completedActivity = document.getElementById('completed')
        this.getActivitiesLocalStorage()
        this.printActivities()

    }

    getActivitiesLocalStorage () {
        this.allActivities = JSON.parse(localStorage.getItem('allActivities')) || []
    }

    updateActivitiesLocalStorage () {
        localStorage.setItem('allActivities', JSON.stringify(this.allActivities))
      }

    handleSubmitActivity(e) {
        e.preventDefault()
        console.log('FORM')
        console.log(this.inputActivity.value)
        console.log(this.intensityActivity.value)
        console.log(this.frequencyActivity.value)
        console.log(this.completedActivity.checked)

        if (isTheInputEmpty(this.inputActivity)) {
            const errorAlert = createBootstrapAlert('¡Nombre del reto está vacío!')
            return
        }

        const newActivity = new Activity(this.inputActivity.value, this.intensityActivity.value, 
        this.frequencyActivity.value, this.completedActivity.checked)
        this.allActivities = [...this.allActivities, newActivity]
        console.log(this.allActivities)
        this.printActivities()
        console.log(newActivity)
        this.updateActivitiesLocalStorage()
        this.inputActivity.value = ''
        this.completedActivity.checked = false
        this.inputActivity.focus()
    }

    printActivities() {
        this.activityBox.innerHTML = ''
        const activityHTML = document.createElement('h2')
        activityHTML.className = 'text-white text-center'
        activityHTML.textContent = 'Mis retos'
        this.activityBox.append(activityHTML)

        if (this.allActivities.length > 0) {
            this.allActivities.forEach ((activity) => {
                this.createActivity(activity)
            })
        } else {
            this.activityBox.innerHTML = ''
            const emptyHTML = document.createElement('h2')
            emptyHTML.className = 'text-white text-center'
            emptyHTML.textContent = 'Introduce tu primer reto'
            this.activityBox.append(emptyHTML)
        }
        
    }

    createActivity(activity) {
        const activityHTML = document.createElement('h3')
        activityHTML.className = 'task d-flex fs-5 mt-3 gap-4'
        activityHTML.textContent = activity.task

        const spanHTML = document.createElement('span')
        if(activity.intensity === 'Súper') {
            spanHTML.className = 'bg-warning text-white'
        } else if (activity.intensity === 'Medio') {
            spanHTML.className = 'bg-yellow text-black'

        } else  spanHTML.className = 'bg-green text-black'
        spanHTML.textContent = activity.intensity
        
        const frecuencyHTML = document.createElement('span')
        frecuencyHTML.className = 'form-frequency d-flex'
        frecuencyHTML.textContent = activity.frequency

        
        const checkBtn = document.createElement('i')
        checkBtn.className = activity.completed ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-down-fill'
        const deleteBtn = document.createElement('i')
        deleteBtn.className = 'bi trash bi-trash text-warning ms-auto'
        deleteBtn.onclick = () => this.deleteActivity(activity.id)
        activityHTML.append(spanHTML,frecuencyHTML, checkBtn, deleteBtn)
        this.activityBox.append(activityHTML)

    }

    deleteActivity (id) {        
        console.log('delete')
        this.allActivities = this.allActivities.filter((activity) => activity.id !== id)
        console.log(this.allActivities)
        this.printActivities()
        this.updateActivitiesLocalStorage()
    }

}














export default ActivityApp