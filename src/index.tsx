import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import { App } from './components/app';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Получение данных из localStorage

function setItem<T>(key: string, value: T): void {
	localStorage.setItem(key, JSON.stringify(value));
}
function getItem<T>(key: string): T | null {
	const item = localStorage.getItem(key);
	return item ? (JSON.parse(item) as T) : null;
}
const settingsAppPersonal = getItem<ArticleStateType>('settings');
const settingsApp = settingsAppPersonal
	? settingsAppPersonal
	: defaultArticleState;

function setSettingsLocalStorage(option: ArticleStateType) {
	setItem('settings', option);
}

function resetSettingsLocalStorage() {
	setItem('settings', defaultArticleState);
}

// type AppProps = {
// 	settings: ArticleStateType;
// 	defaultSettings: ArticleStateType;
// };

// const App = (props: AppProps) => {
// 	const [settingsApp, setSettingsApp] = useState(props.settings);

// 	const setSettings = (settings: ArticleStateType) => {
// 		setSettingsApp(settings);
// 		setItem<ArticleStateType>('settings', settings);
// 	};

// 	const resetSettings = () => {
// 		setSettingsApp(props.defaultSettings);
// 		setItem<ArticleStateType>('settings', props.defaultSettings);
// 	};

// 	return (
// 		<main
// 			className={styles.main}
// 			style={
// 				{
// 					'--font-family': settingsApp.fontFamilyOption.value,
// 					'--font-size': settingsApp.fontSizeOption.value,
// 					'--font-color': settingsApp.fontColor.value,
// 					'--container-width': settingsApp.contentWidth.value,
// 					'--bg-color': settingsApp.backgroundColor.value,
// 				} as CSSProperties
// 			}>
// 			<ArticleParamsForm
// 				settings={settingsApp}
// 				setParam={setSettings}
// 				resetParam={resetSettings}
// 			/>
// 			<Article />
// 		</main>
// 	);
// };

root.render(
	<StrictMode>
		<App
			settings={settingsApp}
			defaultSettings={defaultArticleState}
			setSettingsLocalStorage={setSettingsLocalStorage}
			resetSettingsLocalStorage={resetSettingsLocalStorage}
		/>
	</StrictMode>
);
