import { App } from './app.js';
import { renderTo } from './lib/lib.js'
import { Store } from './lib/store.js'
import { initDate } from './lib/date.js';



const store = Store(initDate())

store.subscribe(
    () => renderTo(
        document.querySelector("#app"),
        App(store)
    )
)