import Control from "../common/Control";
import {taskItem} from "../App";
import Task from "./Task";
//todo per week - and then ...
//
export default class SubDivideTasks extends Control {
	private tasksList: taskItem[];
//	private divideParams: { category: string; params: string[] }[];
	onSubDivideForm: (divideData: { name: string, sort: string }[]) => void
//	fieldSets: Record<string, Control<HTMLFieldSetElement>>

	constructor(parentNode: HTMLElement, tasksList: taskItem[]) {
		super(parentNode, 'div', '', 'subDiv');

		this.tasksList = tasksList
		const fieldSets:Record<string, Control<HTMLFieldSetElement>> = {}
		const form: Control<HTMLFormElement> = new Control(this.node, 'form')
		const formData = new FormData(form.node)
		this.tasksList.forEach(_task => {
			const task = new Task(form.node, _task,formData)
			task.onSetFieldSet=(name,params)=>{
				fieldSets[name]=params
			}

		})
		const submitButton = new Control(form.node, 'button')
		submitButton.node.onclick = (e) => {
			console.log(fieldSets)
			e.preventDefault()
			this.tasksList.forEach(t => {
				console.log(t)
				if (!formData.get(t.name)) {
					console.log(t.name,fieldSets[t.name])
					fieldSets[t.name].node.style.background = 'red'
				} else {
					fieldSets[t.name].node.style.background = 'green'
				}
			})
			if (tasksList.every(e => formData.get(e.name))) {
				const divideData = tasksList.map(e => {
					return {name: e.name, sort: '' + formData.get(e.name)}
				})
				this.onSubDivideForm(divideData)
			}
		}
	}
}