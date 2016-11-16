import { h, Component } 				from 'preact/preact';
import ButtonBase						from 'com/button-base/base';

export default class DialogBase extends Component {
	constructor() {
		this._eventWheel = this.eventWheel.bind(this);
		this._eventKey = this.eventKey.bind(this);
	}

	componentDidMount() {
		console.log("DialogBase: componentDidMount");
		document.body.addEventListener('mousewheel', this._eventWheel);
		document.body.addEventListener('keydown', this._eventKey);
	}
	
	componentDidUnmount() {
		console.log("DialogBase: componentDidUnmount");
		document.body.removeEventListener('mousewheel', this._eventWheel);
		document.body.removeEventListener('keydown', this._eventKey);
	}
	
	eventWheel( e ) {
		// Disables Mouse Wheel
		if ( document.getElementById("dialog-background") ) {
			e.preventDefault();
		}
	}
	
	eventKey( e ) {
		var el = document.getElementById("dialog-background");
		
		if ( el ) {
			var keys_to_disable = [
				9, 					// Tab
				33, 34, 			// PgUp, PgDown
				35, 36,				// End, Home
				37, 38, 39, 40,		// Left, Up, Right, Down
			];
			
			if( keys_to_disable.indexOf(e.keyCode) >= 0) {
				e.preventDefault();
			}
			// ESC key
			else if ( e.keyCode == 27 ) {
				if ( !el.hasAttribute("explicit") ) {
					this.abort();
				}
			}
		}
	}
	

	abort() {
		window.location.hash = "#";
	}
	
	render( props ) {
		var _Abort = { onclick: e => { this.abort(); }};
		var Abort = props.explicit ? { explicit:true } : _Abort;
		var Error = props.error ? (<div class="-error"><strong>Error:</strong> {props.error}</div>) : "";
		
		var ButtonOK = "";
		var ButtonCancel = "";
		
		if ( props.ok ) {
			let Click = props.onclick ? { onclick: props.onclick } : (props.cancel ? {} : _Abort);
			ButtonOK = <ButtonBase class="-button -light" {...Click}>{props.oktext ? props.oktext : "OK"}</ButtonBase>;
		}
		if ( props.cancel ) {
			let Click = props.oncancel ? { onclick: props.oncancel } : _Abort;
			ButtonCancel = <ButtonBase class="-button" {...Click}>{props.canceltext ? props.canceltext : "Cancel"}</ButtonBase>;
		}

		return (
			<div class="dialog-background" id="dialog-background" {...Abort}>
				<div class="dialog-base" onclick={ e => event.stopPropagation() }>
					<div class="-header">
						<div class="-title _font2">{props.title}</div>
					</div>
					{Error}
					<div class="-body">{props.children}</div>
					<div class="-footer">
						{ButtonOK}
						{ButtonCancel}
					</div>
				</div>
			</div>
		);
	}
}
