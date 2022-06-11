import Control from "../../common/Control";
import {TaskItem} from "./TaskItem";
import weekItemStyles from './styles.css'

export default class DayInWeek extends Control{
	private spanTasks: Control<HTMLElement>;
	onFromWeekDrag:(day:string,task:string)=>void
	onDropFromDay:(day:string,task:string)=>void
	private tasks: Record<string, TaskItem>;
	private dayName: string;
	constructor(parentNode:HTMLElement,day: [string, string[]]) {
		super(parentNode,'p', weekItemStyles.weekItemDay);
		this.tasks={}
		//const p = new Control(this.node, )
		this.dayName=day[0]
		const spanDay = new Control(this.node, 'span', '', this.dayName)
		this.spanTasks = new Control(this.node, 'span', weekItemStyles.spanTasks);
		day[1].forEach(d => {
		this.createTask(d)
		})
		this.spanTasks.node.ondragover = (e) => {
			e.preventDefault()
			this.spanTasks.node.ondrop = (ev) => {
				ev.preventDefault()
				const el = ev.dataTransfer.getData('text/plain')
				console.log("**Drop")
				this.onDropFromDay(this.dayName,el)
				this.createTask(el)
			}
		}
	}
	addTask(task: string) {
	//	console.log("DainiWeek--- addTask")
		//this.createTask(task)
		// console.log('DayInWeek--addTask')
		// const item=new TaskItem(this.spanTasks.node,task)
		// this.tasks[task]=item
		// console.log('add',this.tasks)
	}

	deleteTask(task: string) {
		this.tasks[task].destroy()
		//console.log('delete',this.tasks)
	}

	private createTask(_task:string) {
		//console.log("DaiInWeek--- createTask")
		const task= new TaskItem(this.spanTasks.node,_task)
		this.tasks[_task]=task
	//	console.log("!!!!!",this.tasks)
		task.onFromWeekDrag=()=>{
			this.onFromWeekDrag(this.dayName,_task)
		}
	}
}