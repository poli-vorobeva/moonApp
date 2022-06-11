import Control from "../common/Control";
import WeekItem from "./WeekItem/WeekItem";
import showWeeksStyles from './styles.css'



export default class ShowWeeks extends Control{
	private fromWeekGragg: number;
	private toWeekDragg: number;
	private weeksEls: WeekItem[];
	private fromDayGragg: string;
	private graggedTask: string;
	private weeksArrayData: Record<string, string[]>[];
	constructor(parentNode: HTMLElement, data: Record<string, string[]>, weeks: number) {
		super(parentNode,'div',showWeeksStyles.showWeeksContainer);
		this.weeksArrayData=new Array(weeks).fill(Object.assign({},data))
//		console.log('__',weeksArrayData)
		//todo start from next week or from tomorrow
		this.weeksEls=[]
		this.toWeekDragg=null
		//const weekData=Object.assign({},data)
		for(let i=0;i<weeks;i++){
			const weekItem=new WeekItem(this.node,data)
			this.weeksEls.push(weekItem)
			console.log('&&',this.weeksEls,)
			weekItem.onFromWeekDrag=(day,task)=>{
				this.fromWeekGragg=i
				this.fromDayGragg=day
				this.graggedTask=task
				//console.log(i,day,task,'this.fromWeekGragg,')
			}
			weekItem.onDropFromDay=(day,task)=>{
				this.toWeekDragg=i
				//console.log('^^^',i,day,task)
				//console.log(this.weeksEls)
			//	console.log(this.weeksEls[this.fromWeekGragg])
				this.weeksEls[i].newTask(day,task)
				this.weeksEls[this.fromWeekGragg].deleteTask(this.fromDayGragg,this.graggedTask)
				this.weeksArrayData[i][day].push(task)
				this.weeksArrayData[this.fromWeekGragg][this.fromDayGragg]=
					this.weeksArrayData[this.fromWeekGragg][this.fromDayGragg].filter(e=>e!==this.graggedTask)
				//console.log('this. toWeekDragg',this.toWeekDragg)

				//weekItem.addTask(day,task)
			//	this.addTaskToWeek(day,task)
			}
		}
		//week-day-data-
	}
	addTaskToWeek(day:string,task:string){
		this.weeksEls[this.toWeekDragg].addTask(day,task)
	}
}