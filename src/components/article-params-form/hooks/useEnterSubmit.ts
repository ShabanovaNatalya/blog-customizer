import { useEffect } from 'react';
import { ArticleStateType } from 'src/constants/articleProps';

type UseEnterSubmit = {
	isOpen: boolean;
	setSettings: (settings: ArticleStateType) => void;
	optionRef: React.RefObject<HTMLDivElement>;
	option: ArticleStateType;
};

export const useEnterSubmit = ({
	isOpen,
	setSettings,
	optionRef,
	option,
}: UseEnterSubmit) => {
	useEffect(() => {
		const optionHtml = optionRef.current;
		if (!optionHtml) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Enter') {
				setSettings(option);
			}
		};

		document.addEventListener('keydown', handleEnterKeyDown);
		return () => {
			document.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [isOpen, optionRef, option]);
};
