import Control from "../../common/Control";

export class TaskItem extends Control{
	onFromWeekDrag:()=>void
	constructor(parentNode:HTMLElement,d:string) {
		super(parentNode,'span', '', d);
		this.node.setAttribute('draggable', 'true')
		this.node.ondragstart = (ev) => {
			ev.dataTransfer.setData("text/plain", d)
			this.onFromWeekDrag()
		}
	}
}