import { App } from './app.js';
import { renderTo } from './lib/lib.js'
import { Store } from './lib/store.js'
import { getWeekDay, getToday, getCalendar, date } from './lib/date.js';


const initDate = () =>
{
    const today = getToday()
    const initMonth = date(today.year, today.month)
    const weekDate = getWeekDay(initMonth)
    const lists = getCalendar(today.dates, today.month, 1, [], weekDate.prefix)

    const store = Store({
        lists: lists,
        selected: [],
        month: today.month,
        year: today.year,
        dates: today.dates,
    })

    return { store }
}

const dateStore = initDate().store

dateStore.subscribe(
    () => renderTo(
        document.querySelector("#app"),
        App(dateStore)
    )
)