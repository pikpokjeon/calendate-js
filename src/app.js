import { fragment, create, loop, If, pipe } from "./lib/lib"
import { getWeekDay, getCalendar, date, } from './lib/date'

const ul = create('ul', { id: "date-ul" })
const li = create('li', { class: 'date-li' })
const div = create('div', { class: 'container' })
const p = create('p', { class: 'day' })
const span = create('span')
const b = create('button')
// const selected = create('p', { class: 'selected' })

const App = (store) =>
{

    const handleDates = store.action(
        (i, { year, month, dates }) =>
        {
            if (month < 0) dates.setYear(year - 1), dates.setMonth(month + i)
            dates.setMonth(month + i)
            if (month + i < 0) dates.setYear(year - 1 + i)
            if (month + i > 11) dates.setYear(year + 1 + i)
            const d = new Date(dates)
            return ({
                lists: getCalendar(dates, month + i, 1, [], getWeekDay(dates).prefix), dates: d, month: d.getMonth(),
                year: d.getFullYear(),
                day: d.getDate(),
            })
        }
    )

    const { year, month, lists } = store.getState()
    const save = (e) => {
        console.log(e)
    }
    const calendar = lists.map(week =>
        li(week.map(day =>
            div({class:'day'},[span({ class: `day-${day}`, 'data-action':save}, `${day}`)])
            )))

    const button = ({ i, onChangeDate }) =>
        b({ onclick: () => onChangeDate(i) }, i < 0 ? '<' : '>')

    const onSelectDate = store.action((e,{selected}) =>{
        const date = Number(e.path[0].outerText)
        const {start,end,period} = selected
        const isAllSelected = selected.start >  0 && selected.end > 0
        if(isAllSelected)
        {
            return({selected:{ ...selected,period:[Array(start+end).fill(Math.min(start,end)).map(n => n+1)]}})
        }
        else
        {
            selected.turn = start < 0 ? 'start' : end < 0 ? 'end' : 'end'
            const temp = selected[selected.turn] > 0 ?  selected[selected.turn]  : 10
            return({selected: {...selected,[selected.turn]: date}})
        }
            
    })


    return fragment(
        [
            div([
                span(`${year}년`),
                span(`${month + 1}월`)]),
            button({ i: -1, onChangeDate: handleDates }),
            button({ i: 1, onChangeDate: handleDates }),
            div([
                ul({onclick:onSelectDate},[...calendar])
            ])
        ])
}



export { App }