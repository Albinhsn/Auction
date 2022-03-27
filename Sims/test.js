function randomDate(start, end, startHour, endHour) {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}




state = ""
if (state === "Pågående") {
    StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date(), 0, 23)
    

}
else {
    StartDate = randomDate(new Date(new Date().getFullYear(), new Date().getMonth()-4, new Date().getDate()), new Date(), 0, 23)
    
}
EndDate = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() + 8);
console.log(StartDate)
console.log(EndDate)
