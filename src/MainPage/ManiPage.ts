import Control from "../common/Control";
import TaskInput from "./TaskInput/TaskInput";
import TasksList from "./TasksList/TasksList";

export default class MainPage extends Control {
	constructor(props: HTMLElement) {
		super(props, 'div', 'mainPage', 'main');
		const tasksList = new TasksList(this.node)
		const taskInput = new TaskInput(this.node)
		taskInput.onAddTask=(taskData)=>{
			tasksList.addTaskToList(taskData)
		}
	}
}