import React from 'react';
import { HTMLAttributes } from 'react';

import css from './textInput.module.scss';

interface ExampleProps extends HTMLAttributes<HTMLDivElement> {
	example?: string;
}

const Example: React.StatelessComponent<ExampleProps> = (props) => {
	const {
		children,
		className,
		style,
		example,
		...rest
	} = props;

	return (
		<div className={css.example}  {...rest}>
			{example}
		</div>
	);
};

export default Example;
