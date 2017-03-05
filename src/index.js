import React, {
	Component,
	PropTypes,
} from 'react';
//import ImageCutter from './react-image-cutter'
import ImageCutter from '../dist/bundle'
import ReactDOM from 'react-dom'
import header from './header.png'

class Main extends Component {
	constructor(props) {
		super(props);
		this.currentImageDataURL = '';
		this.state               = {}
	}
	
	render() {
		return (
			<div style={{width:500}}>
				<h1>test</h1>
				<ImageCutter
					imgSrc={header}
					getImageDataURL={ImageDataURL => {
									this.currentImageDataURL = ImageDataURL
								}}
				/>
			</div>
		);
	}
}

Main.propTypes    = {};
Main.defaultProps = {};

export default Main;
ReactDOM.render(<Main/>, document.getElementById('root'))