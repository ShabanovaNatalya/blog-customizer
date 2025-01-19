import { CSSProperties, useState } from 'react';
import styles from './app.module.scss';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import { ArticleStateType } from 'src/constants/articleProps';

type AppProps = {
	settings: ArticleStateType;
	defaultSettings: ArticleStateType;
	setSettingsLocalStorage: (option: ArticleStateType) => void;
	resetSettingsLocalStorage: () => void;
};

export const App = (props: AppProps) => {
	const [settingsApp, setSettingsApp] = useState(props.settings);
	const { setSettingsLocalStorage, resetSettingsLocalStorage } = props;

	const setSettings = (settings: ArticleStateType) => {
		setSettingsApp(settings);
		setSettingsLocalStorage(settings);
	};

	const resetSettings = () => {
		setSettingsApp(props.defaultSettings);
		resetSettingsLocalStorage;
	};

	return (
		<main
			className={styles.main}
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
