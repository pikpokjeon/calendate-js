import { fragment, create, loop, If, pipe } from "./lib/lib"
import { getWeekDay, getCalendar, getToday, datem, updateDate } from './lib/date'

const ul = create('ul', { id: "date-ul" })
const li = create('li', { class: 'date-li' })
const div = create('div', { class: 'container' })
const p = create('p', { class: 'day' })
const span = create('span')
const selected = create('p', { class: 'selected' })

const App = (store) =>
{

    const weekDay = dates => getWeekDay(dates)

    const changeMonth = (i, month, dates) => { dates.setMonth(month + i); return dates }

    const handleDates = store.action(
        (i, { year, month, day, dates }) =>
            updateDate(dates, year, month, i)
    )

    const { dates, year, month, lists } = store.getState()

    const calendar = lists.map(week =>
        li(week.map(day =>
            p({ class: 'day' }, `${day}`))))

    const button = ({ i, onChangeDate }) =>
        span({ onclick: () => onChangeDate(i) }, i < 0 ? '<' : '>')

    return fragment(
        [
            div([
                span(`${year}년`),
                span(`${month + 1}월`)]),
            button({ i: -1, onChangeDate: handleDates }),
            button({ i: 1, onChangeDate: handleDates }),
            div([
                ul([...calendar])
            ])
        ])
}

const weekDay = (d) =>
{

}

const currentDate = () => { }

const computedDate = () => { }

const prevYear = () => { }
const nextYear = () => { }
const prevMonth = () => { }
const nextMonth = () => { }

const currentTime = () => { }
const computeTime = () => { }

const selectRange = () => { }

const alterColor = () => { }

const saveData = () => { }

export { App }