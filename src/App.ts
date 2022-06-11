import Control from "./common/Control";
import MainPage from "./MainPage/ManiPage";
import SubDivideTasks from "./SubDevideTasks/SubDivideTasks";
import RepeatTasks from "./RepeatTasks/RepeatTasks";
import ByWeeksScreen from "./ByWeeksScreen/ByWeeksScreen";
import ShowWeeks from "./ShowWeeks/ShowWeeks";

export type taskItem =
	{ name: string, category: string }
const mockData={
	"Mo": [	"one","reading"	],
	"Tu": [	"two"],
	"We": [	"one","reading"	],
	"Th": [	"run"],
	"Fr": [	"two"	],	"Sa": [	"one","three"	],
	"Su": [	"run"	]}
export default class App extends Control {

	constructor(props: HTMLElement) {
		super(props, 'div', 'app');
		//const mainPage = new MainPage(this.node)
		const weeks=6
		const showWeeks=new ShowWeeks(this.node,mockData,weeks)
		// mainPage.onTaskListReady=(list)=>{
		// 	mainPage.destroy()
		//
		// 	const subDivideTasks=new SubDivideTasks(this.node,list)
		// 	subDivideTasks.onSubDivideForm=(data)=>{
		// 		subDivideTasks.destroy()
		// 		const repeatTasks=new RepeatTasks(this.node,data)
		// 		repeatTasks.onByDaysScreen=(data)=>{
		// 			repeatTasks.destroy()
		// 			//onShowWeeks:(tasksInWeek:Record<string, string[]>)=>void
		// 			const byWeeksScreen = new ByWeeksScreen(this.node,data)
		// 			byWeeksScreen.onShowWeeks=(data)=>{
		// 				byWeeksScreen.destroy()
		// 				const showWeeks=new ShowWeeks(this.node,data,weeks)
		// 			}
		// 		}
		// 	}
		// }

	}

}