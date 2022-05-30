import Control from "../common/Control";
import byWeekStyles from './styles.css'

type tByWeeksTaskData = {
	name: string; sort: string; repeat: number
}
export default class ByWeeksScreen extends Control {
	tasksElements: Record<string, Control<HTMLElement>[]>
	private tasksData: any;
	private dragFromTasks: boolean;
	private draggedTaskFromDay: Control<HTMLElement>;

	constructor(parentNode: HTMLElement, data: tByWeeksTaskData[]) {
		super(parentNode, 'div', byWeekStyles.byWeekContent);
		this.dragFromTasks=false
		this.draggedTaskFromDay=null
		this.tasksData = JSON.parse(JSON.stringify(data))
		this.tasksElements = {}
		const tasksDiv = new Control(this.node, 'div', byWeekStyles.byWeekTasks)
		data.forEach(e => {
			for (let i = 0; i < e.repeat; i++) {
				const task = new Control(tasksDiv.node, 'span', byWeekStyles.byWeekTask, e.name)
				this.tasksElements[e.name]
					? this.tasksElements[e.name].push(task)
					: this.tasksElements[e.name] = [task]
				task.node.setAttribute('draggable', 'true')
				task.node.ondragstart = (ev) => {
					this.dragFromTasks=true
					ev.dataTransfer.setData("text/plain", e.name)

				}
			}
		})
		const weekDays = new Control(this.node, 'div', byWeekStyles.byWeekDays)
		const weekDaysArray = ['Mo', 'Tu', 'We', 'Th', 'Fi', 'Sa', 'Su']
		weekDaysArray.forEach(day => {
			const div = new Control(weekDays.node, 'div', byWeekStyles.byWeekDay)
			div.node.ondragover = (e) => {
				e.preventDefault()
				div.node.ondrop = (ev) => {
					ev.preventDefault()
					const el = ev.dataTransfer.getData('text/plain')
					const taskInDay = new Control(div.node, 'span', '', el)
					taskInDay.node.setAttribute('draggable','true')
					taskInDay.node.ondragstart = (ev) => {
						this.dragFromTasks=false
						this.draggedTaskFromDay=taskInDay
						ev.dataTransfer.setData("text/plain", el)
						}
					if(this.dragFromTasks){
						this.tasksElements[el][this.tasksElements[el].length - 1].destroy()
						this.tasksElements[el].pop()
					}else{
						this.draggedTaskFromDay.destroy()
					}
				}
			}
			const t =new Control(div.node, 'span', '', day)
		})
	}
}