import Control from "../../common/Control";
import byWeekDaysStyles from './styles.css'

export default class WeekDays extends Control {
	private draggedTaskFromDay: Control<HTMLElement>;
	private dragFromTasks: boolean;
	onDeleteTaskElement: (el: string) => void
	private dragFromDay: string;
	private weekDaysArray: Record<string, string[]>;

	constructor(parentnode: HTMLElement) {
		super(parentnode, 'div', byWeekDaysStyles.byWeekDays);
		this.dragFromTasks = false
		this.draggedTaskFromDay = null
		this.weekDaysArray  = {
			Mo: [],
			Tu: [],
			We: [],
			Th: [],
			Fr: [],
			Sa: [],
			Su: [],
		}
		Object.keys(this.weekDaysArray).forEach(day => {
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
						this.dragFromDay=day
						ev.dataTransfer.setData("text/plain", el)
					}
					if (this.dragFromTasks) {
						this.onDeleteTaskElement(el)
						this.weekDaysArray[day].push(el)
					} else {
						const index = this.weekDaysArray[this.dragFromDay].findIndex(t=>t===el)
						delete this.weekDaysArray[this.dragFromDay][index]
						this.weekDaysArray[day].push(el)
						console.log("----",this.weekDaysArray)
						this.draggedTaskFromDay.destroy()
					}
				}
			}
			const t = new Control(div.node, 'span', '', day)
		})
	}

	setDragFromTasks(value: boolean) {
		this.dragFromTasks = value
	}

	getTasksByDays() {
	  const dataTasks:Record<string, string[]>={}
		Object.entries(this.weekDaysArray).forEach(e=>{
			dataTasks[e[0]]=e[1].filter(e=>e)
		})
		return dataTasks
	}
}