

export const getTimeRemaining = (date) => {
    const d = new Date(Date.parse(date))
    let timeRemaining = d - new Date()
    timeRemaining = new Date(timeRemaining)
    return {
        Year: timeRemaining.getFullYear() - 1970,
        Month:  timeRemaining.getMonth() ,
        Day: timeRemaining.getDate() - 1,
        Hour: timeRemaining.getHours() ,
        Minutes: timeRemaining.getMinutes(),
        Seconds: timeRemaining.getSeconds()
    }

}

export const reformatDate = (date) => {
    
    if(date.Year> 0){
        date.Seconds = 0
        date.Minutes = 0
        date.Hour = 0
    } 
    else if(date.Month > 0){
        date.Seconds = 0
        date.Minutes = 0
    }
    return date


}