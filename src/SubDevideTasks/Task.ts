import Control from "../common/Control";

export default class Task extends Control{
	private divideParams: { category: string; params: string[] }[];
	onSetFieldSet:(name:string,params:Control<HTMLFieldSetElement>)=>void
	constructor(parentNode: HTMLElement, _task: { name: string; category: string }, formData: FormData) {
		super(parentNode,'div', 'task');
		this.divideParams = [
			{
				category: 'study',
				params: ['by video lessons', 'by chapters', 'by time']
			},
			{
				category: 'chores',
				params: ['by time', 'by kind of activity']
			},
			{
				category: 'sport',
				params: ['by time', 'by lessons']
			}
		]
		const name = new Control(this.node, 'span', '', _task.name)
		const params:Control<HTMLFieldSetElement> = new Control(parentNode, 'fieldset', '')
		//this.onSetFieldSet(_task.name,params)
		setTimeout(()=>this.onSetFieldSet(_task.name,params))

		const paramsIt = this.divideParams.find(e => e.category === _task.category)
		const legend = new Control(params.node, 'legend', '', 'Choose ...'+_task.name)

		paramsIt.params.forEach(par => {
			const checkWrapper = new Control(params.node, 'div')
			const checkbox = new Control(checkWrapper.node, 'input', '')
			checkbox.node.setAttribute('type', 'radio')
			checkbox.node.setAttribute('name', _task.name)
			checkbox.node.setAttribute('id', par)
			checkbox.node.onchange=()=>{
				formData.set(_task.name,par)
				this.onSetFieldSet(_task.name,params)
			}
			const label = new Control(checkWrapper.node, 'label', '', par)
			label.node.setAttribute('for',par)
		})
	}
}