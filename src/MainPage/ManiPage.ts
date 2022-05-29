import Control from "../common/Control";
import TaskInput from "./TaskInput/TaskInput";
import TasksList from "./TasksList/TasksList";
import {taskItem} from "../App";

export default class MainPage extends Control {
	private finishButton: Control<HTMLElement>;
	onTaskListReady:(list:taskItem[])=>void
	constructor(props: HTMLElement) {
		super(props, 'div', 'mainPage', 'main');
		const tasksList = new TasksList(this.node)
		const taskInput = new TaskInput(this.node)
		taskInput.onAddTask=(taskData)=>{
			tasksList.addTaskToList(taskData)
		}
		this.finishButton=new Control(this.node,'button','','Next Step')
		this.finishButton.node.onclick=()=>{
			this.onTaskListReady(tasksList.getAllTasks())
		}
	}
}