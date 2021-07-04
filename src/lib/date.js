const getWeekDay = date =>
{
    const weekDays = ['월', '화', '수', '목', '금', '토', '일']
    const today = date.toLocaleDateString('ko-KR', { weekday: 'long' }).split(' ').reverse()[0][0]
    const idx = date.getDay()
    const prefix = weekDays.concat(Array(idx).fill(''))

    return { today: today, preGap: idx, prefix }
}

const getCalendar = (date, month, i, weeks, week) =>
{

    const limit = 6
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

const updateDate = (date, year, month, i) =>
{
    if (month + i < 12 || month + i > -1) date.setMonth(month + i)
    if (month + i < 0) date.setYear(year - 1)

    const d = date
    const weekDate = getWeekDay(d)
    const lists = getCalendar(date, month + i, 1, [], weekDate.prefix)
    console.log(date, year, month, i)
    return ({
        lists: lists,
        month: date.getMonth(),
        year: date.getFullYear(),
        day: date.getDate(),
        dates: date,
    })
}


const initDate = () =>
{
    const today = getToday()
    const initDates = date(today.year, today.month, 1)
    const weekDate = getWeekDay(initDates)
    const lists = getCalendar(initDates, today.month, 1, [], weekDate.prefix)
    return ({
        lists: lists,
        month: today.month,
        year: today.year,
        day: today.date,
        dates: initDates,
    })
}


export { getWeekDay, getCalendar, getToday, date, initDate, updateDate }