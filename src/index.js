import { App } from './app.js';
import { renderTo } from './lib/lib.js'
import { Store } from './lib/store.js'
import { getWeekDay, getToday, getCalendar } from './lib/date.js';


const initDate = () =>
{
    const today = getToday()
    const weekDate = getWeekDay(today.dates)
    const lists = getCalendar(today.dates, today.month, 1, [], weekDate.prefix)

    const store = Store({
        lists,
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
        App(dateStore.store)
    )
)