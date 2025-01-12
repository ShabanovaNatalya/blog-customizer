import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	setParam: (settings: ArticleStateType) => void;
	resetParam: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [settings, setSettings] = useState(props.settings);
	const setParam = props.setParam;
	const resetParam = props.resetParam;
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleClickOpen = () => {
		setIsOpen(isOpen === false ? true : false);
	};
	const setFonts = (option: OptionType) => {
		setSettings({
			...settings,
			fontFamilyOption: option,
		});
	};
	const setFontSize = (option: OptionType) => {
		setSettings({
			...settings,
			fontSizeOption: option,
		});
	};
	const setColor = (option: OptionType) => {
		setSettings({
			...settings,
			fontColor: option,
		});
	};
	const setBackgroundColor = (option: OptionType) => {
		setSettings({
			...settings,
			backgroundColor: option,
		});
	};
	const setWidth = (option: OptionType) => {
		setSettings({
			...settings,
			contentWidth: option,
		});
	};

	const resetSettings = () => {
		resetParam();
		setSettings(defaultArticleState);
	};

	const applySettings = (settings: ArticleStateType) => {
		setParam(settings);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClickOpen} />
			<div ref={rootRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={settings.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={setFonts}
						/>
						<RadioGroup
							name='Размер шрифта'
							options={fontSizeOptions}
							selected={settings.fontSizeOption}
							onChange={setFontSize}
							title='Размер шрифта'
						/>
						<Select
							selected={settings.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={setColor}
						/>
						<Separator />
						<Select
							selected={settings.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={setBackgroundColor}
						/>
						<Select
							selected={settings.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={setWidth}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									resetSettings();
								}}
							/>
							<Button
								title='Применить'
								htmlType='button'
								type='apply'
								onClick={() => {
									applySettings(settings);
								}}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
