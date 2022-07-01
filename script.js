const timeDisplay = document.getElementById('timeDisplay')
const timeSelect = document.getElementById('timeSelect')
const alarmStatus = document.getElementById('alarmStatus')
const alarmStop = document.getElementById('alarmStop')

let alarmSound = new Audio('alarmSound.mp3')

let userAlarmTime

timeSelect.addEventListener('change', function() {
    userAlarmTime = timeSelect.value
    alarmStatus.innerHTML = `Set for ${userAlarmTime}`
})

let currentTimeCheck

setInterval(function() {
    let date = new Date()
    hours = date.getHours()
    if (date.getMinutes() < 10) {
        minutes = `0${date.getMinutes()}`
    } else {
        minutes = date.getMinutes()
    }
    if (date.getSeconds() < 10){
        seconds = `0${date.getSeconds()}`
    } else {
        seconds = date.getSeconds()
    }
    timeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`

    if (hours > 9) {
        currentTimeCheck = `${hours}:${minutes}`
    } else {
        currentTimeCheck = `0${hours}:${minutes}`
    }

    if (currentTimeCheck == userAlarmTime) {
        alarmSound.load()
        alarmSound.play()
        alarmSound.loop = true
        userAlarmTime = 0
        alarmStatus.innerHTML = 'Active'
        alarmStatus.style.color = 'Red'
        alarmStop.disabled = false
        alarmStop.addEventListener('click', function() {
            alarmSound.pause()
            alarmStatus.style.color = 'Black'
            alarmStatus.innerHTML = 'not yet set'
            userAlarmTime = ''
            alarmStop.disabled = true
            timeSelect.value = ''
        })
    }
}, 1000)
