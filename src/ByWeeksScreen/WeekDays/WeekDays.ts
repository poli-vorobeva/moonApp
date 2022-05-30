import Control from "../../common/Control";
import byWeekDaysStyles from './styles.css'

export default class WeekDays extends Control {
	private draggedTaskFromDay: Control<HTMLElement>;
	private dragFromTasks: boolean;
	onDeleteTaskElement:(el:string)=>void
	constructor(parentnode: HTMLElement) {
		super(parentnode,'div', byWeekDaysStyles.byWeekDays);
		this.dragFromTasks = false
		this.draggedTaskFromDay = null
		const weekDaysArray = ['Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa', 'Su']
		weekDaysArray.forEach(day => {
			const div = new Control(this.node, 'div', byWeekDaysStyles.byWeekDay)
			div.node.ondragover = (e) => {
				e.preventDefault()
				div.node.ondrop = (ev) => {
					ev.preventDefault()
					const el = ev.dataTransfer.getData('text/plain')
					const taskInDay = new Control(div.node, 'span', '', el)
					taskInDay.node.setAttribute('draggable', 'true')
					taskInDay.node.ondragstart = (ev) => {
						this.dragFromTasks = false
						this.draggedTaskFromDay = taskInDay
						ev.dataTransfer.setData("text/plain", el)
					}
					if (this.dragFromTasks) {
						this.onDeleteTaskElement(el)
					} else {
						this.draggedTaskFromDay.destroy()
					}
				}
			}
			const t = new Control(div.node, 'span', '', day)
		})
	}

	setDragFromTasks(value: boolean) {
		this.dragFromTasks=value
	}
}