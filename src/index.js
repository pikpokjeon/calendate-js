import { App } from './app.js';
import { renderTo } from './lib/lib.js'
import { Store } from './lib/store.js'
import { getToday } from './lib/date.js';

const today = getToday()

const store = Store({
    lists: [],
    selected: [],
    month: today.month,
    year: today.year,
    dates: today.dates,
})

store.subscribe(
    () => renderTo(
        document.querySelector("#app"),
        App(store)
    )
)