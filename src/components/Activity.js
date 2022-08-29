import { nanoid } from "nanoid"

 

class Activity {
    constructor(task, intensity, frequency, completed) {
        this.id = nanoid(5)
        this.task = task
        this.intensity = intensity
        this.frequency = frequency
        this.completed = completed
    }

}


export default Activity