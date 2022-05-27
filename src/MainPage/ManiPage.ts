import Control from "../common/Control";

export default class MainPage extends Control {
	private taskItemInput: Control<HTMLInputElement>;
	private tasksList: Control<HTMLElement>;
	private tasksListData: {name:string,category:string}[];
	private categories: string[];
	private form: Control<HTMLFormElement>;
	private inputButton: Control<HTMLElement>;

	constructor(props: HTMLElement) {
		super(props, 'div', 'mainPage', 'main');
		this.tasksListData = [
			{name:'one',category:'study'},
			{name:'one',category:'study'},
			{name:'one',category:'study'}]

		this.categories=['study','chores','reading','sport','hobby','learning']
		this.form=new Control(this.node,'form')
		this.taskItemInput = new Control(this.form.node, 'input', 'mainTaskInput')
		this.inputButton= new Control(this.form.node,'button','','Add')
    this.inputButton.node.onclick=(e)=>{e.preventDefault()}
		this.tasksList = new Control(this.node, 'ul', 'mainTasksList')
		this.tasksListData.forEach(task => {
			const taskLi=new Control(this.tasksList.node, 'li', '', task.name)
		})

		this.taskItemInput.node.onchange=(e:InputEvent)=>{
			const categoriesDiv=new Control(this.node,'div','')
			this.categories.forEach(cat=>{
				const category=new Control(categoriesDiv.node,'span','',cat)
				category.node.onclick=()=>{
					console.log((e.target as HTMLInputElement).value,'--',cat)
					categoriesDiv.destroy()
				}})
		}
	}
}