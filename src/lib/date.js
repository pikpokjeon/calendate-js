const getWeekDay = date =>
{
    const weekDays = ['일', '월', '화', '수', '목', '금', '토',]
    const today = date.toLocaleDateString('ko-KR', { weekday: 'long' }).split(' ').reverse()[0][0]
    const idx = date.getDay()
    const prefix = weekDays.concat(Array(idx).fill(''))
    return { today: today, preGap: idx, prefix }
}

const getCalendar = (date, month, i, weeks, week) =>
{

    const limit = 6
    month = month < 0 ? 11 : month > 11 ? 0 : month
    if (date.getMonth() !== month)
    {
        weeks.push(week)
        return weeks
    }

    if (week.length > limit)
    {
        weeks.push(week.filter((_, i) => i <= limit))
        week = [...week.filter((_, i) => i > limit)]
    }

    week.push(i), i++, date.setDate(i)
    return getCalendar(date, month, i, weeks, week)

}


const date = (year, month, day) => new Date(year, month, day ?? 1)


const getToday = () =>
{
    const now = new Date(Date.now())
    return {
        dates: now,
        date: now.getDate(),
        day: now.getDay(),
        month: now.getMonth(),
        year: now.getFullYear(),
    }
}


const initDate = () =>
{
    const today = getToday()
    const initDates = date(today.year, today.month, 1)
    const weekDate = getWeekDay(initDates)
    const lists = getCalendar(initDates, today.month, 1, [], weekDate.prefix)
    return ({
        lists: lists,
        month: today.month + 1,
        year: today.year,
        day: today.date,
        dates: initDates,
    })
}


export { getWeekDay, getCalendar, getToday, date, initDate }