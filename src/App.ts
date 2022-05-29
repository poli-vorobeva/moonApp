import Control from "./common/Control";
import MainPage from "./MainPage/ManiPage";

export type taskItem =
	{ name: string, category: string }

export default class App extends Control {
	private mainPage: MainPage;

	constructor(props: HTMLElement) {
		super(props, 'div', 'app');
		this.mainPage = new MainPage(this.node)

	}

}