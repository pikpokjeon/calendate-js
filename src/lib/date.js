const weekDay = date =>
{
    const weekDays = ['월', '화', '수', '목', '금', '토', '일']
    const today = date.toLocaleDateString('ko-KR', { weekday: 'long' }).split(' ').reverse()[0][0]
    const idx = weekDay => weekDays.indexOf(weekDay)
    const prefix = weekDays.concat(Array(idx(today)).fill(''))

    return { today: today, preGap: idx(today), prefix }
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