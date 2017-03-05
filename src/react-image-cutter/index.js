import React, {
	Component,
	PropTypes,
} from 'react';
import './index.scss';
import ResizeEle from './ResizeElement'
import ReactDOM from 'react-dom'

class PicCutter extends Component {
	constructor(props) {
		super(props)
		this.state          = {
			PicCutterData:{
				top:20,
				left:20,
				right:20,
				bottom:20
			}
		}
		this.lastCoordinate = {}
		this.ResizeEleData  = [
			{
				className : 'pos-a left top nesw-resize',
				dataAction: 'left,top'
			}, {
				className : 'pos-a left bottom nwse-resize',
				dataAction: 'left,bottom'
			}, {
				className : 'pos-a top right nwse-resize',
				dataAction: 'top,right'
			}, {
				className : 'pos-a right bottom  nesw-resize',
				dataAction: 'right,bottom'
			}, {
				className : 'resize-strip top-side',
				dataAction: 'top'
			}, {
				className : 'resize-strip right-side',
				dataAction: 'right'
			}, {
				className : 'resize-strip bottom-side',
				dataAction: 'bottom'
			}, {
				className : 'resize-strip left-side',
				dataAction: 'left'
			}
		]
		this.computedMap    = {
			top   : event => this.lastCoordinate.top + (event.pageY - this.lastCoordinate.pageY),
			bottom: event => this.lastCoordinate.bottom - (event.pageY - this.lastCoordinate.pageY),
			right : event => this.lastCoordinate.right - (event.pageX - this.lastCoordinate.pageX),
			left  : event => this.lastCoordinate.left + (event.pageX - this.lastCoordinate.pageX)
		}
		this.canResize      = {
			clicked: false,
			flag   : {},
		}
		this.selectBoxDom   = null
	}
	
	setResizeFlag = (action, reset) => {
		if (reset) {
			this.canResize.flag = {}
		} else {
			this.canResize.flag[action] = true
		}
	}
	setClick      = (boolean) => {
		this.canResize.clicked = boolean
	}
	
	mouseEventListener() {
		document.body.addEventListener('mousedown', event => {
			this.setClick(true)
			this.setLastCoordinate(event)
		})
		document.body.addEventListener('mouseup', event => {
			this.setClick(false)
			this.setResizeFlag(null, true);
			this.setLastCoordinate(event)
			//每次选择完毕都重新截图
			let rect              = this.SelectBoxDom.getBoundingClientRect()
			let {
				    top,
				    left,
			    }                 = this.SelectBoxDom.style
			this.canvasDom.height = rect.height;
			this.canvasDom.width  = rect.width;
			let multiple          = (this.imgOw / this.img.offsetWidth).toFixed(2);
			this.ctx.drawImage(this.img, parseFloat(left).toFixed(1) * multiple, parseFloat(top).toFixed(1) * multiple, rect.width * multiple, rect.height * multiple, 0, 0, rect.width, rect.height)
			this.props.getImageDataURL(this.canvasDom.toDataURL('image/jpeg', 0.8))
		})
		document.body.addEventListener('mousemove', event => {
			this.coordinatePreprocessor(event)
		})
	}
	
	componentDidMount() {
		this.mouseEventListener.call(this)
		this.SelectBoxDom = ReactDOM.findDOMNode(this.refs.selectArea);
		this.canvasDom    = ReactDOM.findDOMNode(this.refs.canvas)
		this.img          = ReactDOM.findDOMNode(this.refs.img)
		this.ctx          = this.canvasDom.getContext('2d')
		//for debug
		//let dom           = ReactDOM.findDOMNode(this.refs.selectArea)
		//window.img        = this.img
		//window.dom        = dom;
		
	}
	
	componentWillUnmount() {
		document.body.removeEventListener('mousedown', function () {
		})
		document.body.removeEventListener('mouseup', function () {
		})
		document.body.removeEventListener('mousemove', function () {
		})
	}
	
	setLastCoordinate(event) {
		let {PicCutterData} = this.state
		this.lastCoordinate = {
			pageX : event.pageX,
			pageY : event.pageY,
			top   : PicCutterData.top,
			left  : PicCutterData.left,
			bottom: PicCutterData.bottom,
			right : PicCutterData.right,
		}
	}
	
	coordinatePreprocessor(event) {
		if (!this.canResize.clicked) return;
		let action = Object.keys(this.canResize.flag)[0]
		if (!this.canResize.flag[action]) return;
		let lastCoordinateCopy = {...this.lastCoordinate}
		action && action.split(',').map(position => {
			lastCoordinateCopy[position] = this.computedMap[position](event)
		})
		
		this.setState({
			PicCutterData:lastCoordinateCopy,
		});
		
		//this.props.dragOver(lastCoordinateCopy, event)
	}
	
	initImg() {
		
		this.imgOw                = this.img.offsetWidth;
		this.img.style.width      = '100%'
		this.img.style.visibility = 'visible'
		
	}
	
	render() {
		let {PicCutterData} = this.state
		return (
			<div>
				<div className="select-container aic-jcc">
					<div className="select-img" ref="imgBox">
						<div className="select-outer-box"
						     style={{
							     top   : PicCutterData.top,
							     left  : PicCutterData.left,
							     bottom: PicCutterData.bottom,
							     right : PicCutterData.right,
						     }}>
							{
								this.ResizeEleData.map((item, index) => {
									return (
										<ResizeEle
											key={index}
											className={item.className}
											dataAction={item.dataAction}
											setResizeFlag={action => this.setResizeFlag(action)}
										/>
									)
								})
							}
						</div>
						<div className="select-box"
						     style={{
							     top   : PicCutterData.top,
							     left  : PicCutterData.left,
							     bottom: PicCutterData.bottom,
							     right : PicCutterData.right,
						     }}
						     ref={'selectArea'}
						     data-action="left,right,bottom,top"
						     onMouseDown={event => this.setResizeFlag('left,right,bottom,top')}
						>
						</div>
						
						<img
							ref="img"
							onLoad={() => {
								this.initImg()
							}}
							src={this.props.imgSrc}
							alt=""/>
					</div>
				
				</div>
				
				<canvas
					style={{display:'none'}}
					ref="canvas"
				/>
				{/*<img src={this.state.dataURL} alt=""/>*/}
			</div>
		
		);
	}
}

PicCutter.propTypes    = {
	imgSrc: PropTypes.string.isRequired,
	getImageDataURL: PropTypes.func.isRequired
};
PicCutter.defaultProps = {};

export default PicCutter;
