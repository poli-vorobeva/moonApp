import Control from "../../common/Control";
import {taskItem} from "../../App";

export default class TasksList extends Control {
	private tasksListData: taskItem[];
	private tasksList: Control<HTMLElement>;

	constructor(parent: HTMLElement) {
		super(parent);
		this.tasksListData = [
			{name: 'one', category: 'study'},
			{name: 'one', category: 'study'},
			{name: 'one', category: 'study'}]
		this.tasksList = new Control(this.node, 'ul', 'mainTasksList')
		this.tasksListData.forEach(task => {
			this.createTaskLi(task.name)
		})
	}

	addTaskToList(taskData: { name: string; category: string }) {
		this.tasksListData.push(taskData)
		this.createTaskLi(taskData.name)
	}
	createTaskLi(name:string){
		new Control(this.tasksList.node, 'li', '', name)
	}
}