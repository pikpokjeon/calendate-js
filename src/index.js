import { App } from './app.js';
import { renderTo } from './lib/lib.js'
import { Store } from './lib/store.js'
import { getWeekDay, getToday, getCalendar, date } from './lib/date.js';


const initDate = () =>
{
    const today = getToday()
    const initDates = date(today.year, today.month, 1)
    const weekDate = getWeekDay(initDates)
    const lists = getCalendar(initDates, today.month, 1, [], weekDate.prefix)
    return ({
        lists: lists,
        selected: [],
        month: today.month,
        year: today.year,
        day: today.date,
        dates: initDates,
    })
}

const store = Store(initDate())

store.subscribe(
    () => renderTo(
        document.querySelector("#app"),
        App(store)
    )
)