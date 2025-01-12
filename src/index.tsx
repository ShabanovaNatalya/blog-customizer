import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

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

type AppProps = {
	settings: ArticleStateType;
	defaultSettings: ArticleStateType;
};

const App = (props: AppProps) => {
	const [settingsApp, setSettingsApp] = useState(props.settings);

	const setSettings = (settings: ArticleStateType) => {
		setSettingsApp(settings);
		setItem<ArticleStateType>('settings', settings);
	};

	const resetSettings = () => {
		setSettingsApp(props.defaultSettings);
		setItem<ArticleStateType>('settings', props.defaultSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settingsApp.fontFamilyOption.value,
					'--font-size': settingsApp.fontSizeOption.value,
					'--font-color': settingsApp.fontColor.value,
					'--container-width': settingsApp.contentWidth.value,
					'--bg-color': settingsApp.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				settings={settingsApp}
				setParam={setSettings}
				resetParam={resetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App settings={settingsApp} defaultSettings={defaultArticleState} />
	</StrictMode>
);
