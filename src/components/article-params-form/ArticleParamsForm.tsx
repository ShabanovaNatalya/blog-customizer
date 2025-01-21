import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { SyntheticEvent, useRef, useState } from 'react';

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

import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { useEnterSubmit } from './hooks/useEnterSubmit';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	setParam: (settings: ArticleStateType) => void;
	resetParam: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [settings, setSettings] = useState(props.settings);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleClickOpen = () => {
		setIsMenuOpen(isMenuOpen === false ? true : false);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onChange: handleClickOpen,
	});

	const setParam = (param: string, option: OptionType) => {
		setSettings({
			...settings,
			[param]: option,
		});
	};

	useEnterSubmit({
		isOpen: isMenuOpen,
		setSettings: props.setParam,
		optionRef: rootRef,
		option: settings,
	});

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={handleClickOpen} />
			<div ref={rootRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isMenuOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={(evt: SyntheticEvent) => {
							evt.preventDefault();
							props.setParam(settings);
						}}>
						<Text size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={settings.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(option) => {
								setParam('fontFamilyOption', option);
							}}
						/>
						<RadioGroup
							name='Размер шрифта'
							options={fontSizeOptions}
							selected={settings.fontSizeOption}
							onChange={(option) => setParam('fontSizeOption', option)}
							title='Размер шрифта'
						/>
						<Select
							selected={settings.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={(option) => setParam('fontColor', option)}
						/>
						<Separator />
						<Select
							selected={settings.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={(option) => setParam('backgroundColor', option)}
						/>
						<Select
							selected={settings.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={(option) => setParam('contentWidth', option)}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={() => {
									props.resetParam();
									setSettings(defaultArticleState);
								}}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={() => {
									props.setParam(settings);
								}}
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
