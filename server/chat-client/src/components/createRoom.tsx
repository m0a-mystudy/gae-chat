
import * as React from 'react';

interface State {
    hasError: boolean;
    errorMessage: string;
    name: string;
}

interface Props extends React.Props<{}> {
    onCreate(name: string): void;
    onCancel(): void;
}

export default class CreateRoom extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
            name: ''
        };

    }

    checkError() {
        try {
            this.props.onCreate(this.state.name);
        } catch (e) {
            this.setState({
                hasError: true,
                errorMessage: e.message
            });
        }
    }
    normalInput() {
        return (
            <div className="field">
                <label className="label">Room Name</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="room name"
                        value={this.state.name}
                        onChange={(ev) => (this.setState({ name: ev.target.value }))}
                    />
                </div>
            </div>
        );
    }
    errorInput() {
        return (
            <div className="field">
                <label className="label">Room Name</label>
                <div className="control">
                    <input
                        className="input is-danger"
                        type="text"
                        placeholder="room name"
                        value={this.state.name}
                        onChange={(ev) => (this.setState({ name: ev.target.value, hasError: false }))}
                    />
                </div>
                <p className="help is-danger">{this.state.errorMessage}</p>
            </div>
        );
    }
    render() {
        const { onCancel } = this.props;
        const { hasError } = this.state;
        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">create new room</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => onCancel()}
                        />
                    </header>
                    <section className="modal-card-body">
                        {
                            hasError ? this.errorInput() : this.normalInput()
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-success"
                            onClick={() => (this.checkError())}
                        >
                            New
                        </button>
                        <button
                            className="button"
                            aria-label="close"
                            onClick={() => onCancel()}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}
