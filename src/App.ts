import Control from "./common/Control";
import MainPage from "./MainPage/ManiPage";
import SubDivideTasks from "./SubDevideTasks/SubDivideTasks";
import RepeatTasks from "./RepeatTasks/RepeatTasks";

export type taskItem =
	{ name: string, category: string }

export default class App extends Control {

	constructor(props: HTMLElement) {
		super(props, 'div', 'app');
		const mainPage = new MainPage(this.node)
		mainPage.onTaskListReady=(list)=>{
			mainPage.destroy()

			const subDivideTasks=new SubDivideTasks(this.node,list)
			subDivideTasks.onSubDivideForm=(data)=>{
				subDivideTasks.destroy()
				const repeatTasks=new RepeatTasks(this.node,data)
			}
		}

	}

}