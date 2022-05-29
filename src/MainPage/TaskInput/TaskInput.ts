import Control from "../../common/Control";

import taskInputStyles from "./styles.css"
import {taskItem} from "../../App";

export default class TaskInput extends Control {
	onAddTask:(taskData:taskItem)=>void
	private taskItemInput: Control<HTMLInputElement>;
	constructor(parent: HTMLElement) {
		super(parent, 'form');
		const categories = ['study', 'chores', 'sport'/*,'reading',  'hobby', 'learning'*/]
		this.taskItemInput = new Control(this.node, 'input', 'mainTaskInput')
		const button = new Control(this.node, 'button', taskInputStyles['red'], 'Add')
		button.node.onclick = (e) => {
			e.preventDefault()
		}
		this.taskItemInput.node.onchange = (e: InputEvent) => {
			const categoriesDiv = new Control(this.node, 'div', '')
			categories.forEach(cat => {
				const category = new Control(categoriesDiv.node, 'span', '', cat)
				category.node.onclick = () => {
					this.onAddTask({name:(e.target as HTMLInputElement).value, category: cat})
					categoriesDiv.destroy()
					this.taskItemInput.node.value=''
				}


			})
		}
	}
}