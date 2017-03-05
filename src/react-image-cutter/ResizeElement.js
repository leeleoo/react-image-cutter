import React, {
	Component,
	PropTypes,
} from 'react';

class ResizeElement extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<i
				className={this.props.className}
				data-action={this.props.dataAction}
				onMouseDown={() => {
					this.props.setResizeFlag(this.props.dataAction)
				}}
			/>
		);
	}
}

ResizeElement.propTypes    = {};
ResizeElement.defaultProps = {};

export default ResizeElement;
