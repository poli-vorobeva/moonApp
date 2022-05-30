import Control from "../../common/Control";
import {tByWeeksTaskData} from "../ByWeeksScreen";
// @ts-ignore
import byTaskStyles from './styles.css'

export default class TasksByWeek extends Control{
	tasksElements: Record<string, Control<HTMLElement>[]>
	private tasksData: any;
	onSetDragFromTasks:(bool:boolean)=>void
	constructor(parentNode:HTMLElement,data: tByWeeksTaskData[]) {
		super(parentNode);
		this.tasksData = JSON.parse(JSON.stringify(data))
		this.tasksElements = {}
		const tasksDiv = new Control(this.node, 'div', byTaskStyles.byWeekTasks)
		data.forEach(e => {
			for (let i = 0; i < e.repeat; i++) {
				const task = new Control(tasksDiv.node, 'span', byTaskStyles.byWeekTask, e.name)
				this.tasksElements[e.name]
					? this.tasksElements[e.name].push(task)
					: this.tasksElements[e.name] = [task]
				task.node.setAttribute('draggable', 'true')
				task.node.ondragstart = (ev) => {
					this.onSetDragFromTasks(true)
					ev.dataTransfer.setData("text/plain", e.name)

				}
			}
		})
	}

	deleteTaskElement(el: string) {
		this.tasksElements[el][this.tasksElements[el].length - 1].destroy()
		this.tasksElements[el].pop()
	}
}