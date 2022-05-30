import Control from "../common/Control";

export default class RepeatTasks extends Control{
	private repeatsList: { repeat: number; name: string; sort: string }[];
	onByDaysScreen:(data:{name:string, sort:string, repeat:number}[])=>void
	constructor(parentNode:HTMLElement,tasksList:{name:string,sort:string}[]) {
		super(parentNode,'div','','repeat');
		this.repeatsList=tasksList.map(t=>{
			return {name:t.name, sort:t.sort, repeat:1}
		})
		tasksList.forEach(t=>{
			const task = new Control(this.node,'div','',t.name)
			const count= new Control(task.node,'span','','1')
			const dec=new Control(task.node,'button','','dec')
			dec.node.onclick=()=>{
				const newValue=(+count.node.innerText-1)>0 ? (+count.node.innerText-1):1
				count.node.innerText = newValue+''
				this.repeatsList.find(e=>e.name==t.name).repeat=newValue
			}
			const inc=new Control(task.node,'button','','inc')
			inc.node.onclick=()=>{
				const newValue=+count.node.innerText+1
				count.node.innerText = newValue+''
				this.repeatsList.find(e=>e.name==t.name).repeat=newValue
			}
		})
		const nextStepButton=new Control(this.node,'button','','Next')
		nextStepButton.node.onclick=()=>{
			this.onByDaysScreen(this.repeatsList)
		}
	}
}