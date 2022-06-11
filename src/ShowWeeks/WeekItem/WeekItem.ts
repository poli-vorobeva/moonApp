import Control from "../../common/Control";
import weekItemStyles from './styles.css'
import {TaskItem} from "./TaskItem";
import DayInWeek from "./DayInWeek";

export default class WeekItem extends Control {
	onDropFromDay: (day: string, task: string) => void
	onFromWeekDrag: (day:string,task:string) => void
	private spanTasks: Control<HTMLElement>;
	private weekData: DayInWeek[];
	private daysIndexes: string[];

	constructor(parentNode: HTMLElement, data: Record<string, string[]>) {
		super(parentNode, 'div', weekItemStyles.weekContainer);
		this.weekData = []
		this.daysIndexes = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
			Object.entries(data).forEach(day => {
			//	console.log("DDD",day)
			const dayInWeek = new DayInWeek(this.node, day)
			dayInWeek.onFromWeekDrag = (day,task) => {
				this.onFromWeekDrag(day,task)
			}
			dayInWeek.onDropFromDay = (day, task) => {
				this.onDropFromDay(day, task)
			}
			this.weekData.push(dayInWeek)

		})
		//data:add and delete
//console.log('addWeekItem')
		//findDay
		//	new TaskItem(this.spanTasks.node,day)
	}
newTask(day: string, task: string){
//		console.log("NEWWWWWWtask---------")
	const dayIndex = this.daysIndexes.findIndex(e => e == day)
	this.weekData[dayIndex].addTask(task)
}
	addTask(day: string, task: string) {
//		console.log("ADDDDDDtask---------")
	//	console.log("%%addWeekItem")
	//	const dayIndex = this.daysIndexes.findIndex(e => e == day)
	////	this.weekData[dayIndex].addTask(task)
		this.onDropFromDay(day, task)
		//	this.weekDataaddTask(day,task)
	//	console.log()
	}

	deleteTask(day: string, task: string) {
		const dayIndex = this.daysIndexes.findIndex(e => e == day)
	//	console.log('$$$',this.weekData[dayIndex])
		this.weekData[dayIndex].deleteTask(task)
	}
}