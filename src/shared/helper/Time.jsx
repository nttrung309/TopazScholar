export const  GetCalendarDate = () => {
    let calendarDate = [];
    let currentDate = new Date();

    for(let i = 0; i <= 6; i++){
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let currentDateIndex = currentDate.getDay();
    
        calendarDate.push({
            daysOfWeek: (currentDateIndex != 0) ? 'THỨ ' + (currentDateIndex + 1) : 'CHỦ NHẬT',
            day: day,
            month: month,
            year: year
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return calendarDate;
}