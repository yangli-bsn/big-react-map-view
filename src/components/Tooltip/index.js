import React, { Component } from 'react';

import './Tooltip.css';

class Tooltip extends Component<{}, State> {
	constructor(props) {
		super(props);
	}

	render() {
		let className = '';
		if (this.props.active) {
			className = ' active';
		}

		return (
			<div className={'controller-tooltip' + className}>
				Hello
			</div>
		);
	}
}

export default Tooltip;