import Control from "../common/Control";

export default class RepeatTasks extends Control{
	constructor(parentNode:HTMLElement,tasksList:{name:string,sort:string}[]) {
		super(parentNode,'div','','repeat');
		tasksList.forEach(t=>{
			const task = new Control(this.node,'div','',t.name)
			const count= new Control(task.node,'span','','1')
			const dec=new Control(task.node,'button','','dec')
			dec.node.onclick=()=>{
				count.node.innerText = ((+count.node.innerText-1)>0 ? (+count.node.innerText-1):1)+''
			}
			const inc=new Control(task.node,'button','','inc')
			inc.node.onclick=()=>{
				count.node.innerText = (+count.node.innerText+1)+''
			}
		})
	}
}