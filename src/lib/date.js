
const weekDayKo = (date) => date.toLocaleDateString('ko-KR', { weekday: 'long' }).split(' ').reverse()[0][0]

const daysOfMonth = (date, m, i, arr) =>
{
    if (date.getMonth() === m)
    {
        if (i === 1) arr.push(weekDayKo(date))
        arr.push(i)
        date.setDate(date.getDate() + 1)
        i++
        return daysOfMonth(date, m, i, arr)
    }
    return arr
}