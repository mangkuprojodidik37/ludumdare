import { h, Component } 				from 'preact/preact';
import DialogBase						from 'com/dialog-base/base';

export default class DialogRegister extends Component {
	constructor() {
	}
	
	componentDidMount() {
		this.registerMail.focus();
	}

	render( props ) {
		var Error = {};//{ error:"There was a problem" };
		
		// NOTE: There's a Preact bug that the extra <span /> is working around
		return (
			<DialogBase title="Create Account" ok cancel oktext="Send e-mail" {...Error}>
				<div class="-info">
					Enter an e-mail address to begin creating an account.
				</div>
				<div>
					<span /><span class="-label">E-mail:</span><input ref={(input) => this.registerMail = input} class="-text" type="text" name="email" />
				</div>
			</DialogBase>
		);
	}
}
