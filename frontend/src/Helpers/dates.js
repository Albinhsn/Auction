export const getTimeRemaining = (date) => {

    const d = new Date(Date.parse(date))
    
    
    return {
        Year: d.getFullYear(),
        Month: d.getMonth(),
        Day: d.getDay(),
        Hour: d.getHours(),
        Minutes: d.getMinutes(),
        Seconds: d.getSeconds()
    }
}

