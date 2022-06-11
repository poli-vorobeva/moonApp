import Control from "../common/Control";
import byWeekStyles from './styles.css'
import WeekDays from "./WeekDays/WeekDays";
import Task from "../SubDevideTasks/Task";
import TasksByWeek from "./Tasks/Tasks";

export type tByWeeksTaskData = {
	name: string; sort: string; repeat: number
}
export default class ByWeeksScreen extends Control {
	onShowWeeks:(tasksInWeek:Record<string, string[]>)=>void
	constructor(parentNode: HTMLElement, data: tByWeeksTaskData[]) {
		super(parentNode, 'div', byWeekStyles.byWeekContent);
		const tasks = new TasksByWeek(this.node, data)
		tasks.onSetDragFromTasks = (bool) => weekDays.setDragFromTasks(bool)

		const weekDays = new WeekDays(this.node)
		weekDays.onDeleteTaskElement = (el) => tasks.deleteTaskElement(el)
		const readyButton= new Control(this.node,'button','Ready...')
		readyButton.node.onclick=()=>{
			const tasksInWeek = weekDays.getTasksByDays()
			const isEmptyTasks=tasks.isEmptyTasks()
			if(isEmptyTasks){
				this.onShowWeeks(tasksInWeek)
			}
		}
	}
}