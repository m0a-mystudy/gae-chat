
import * as React from 'react';

interface State {
    name: string;
}

interface Props extends React.Props<{}> {
    errorMessage: string;
    onCreate(name: string): void;
    onCancel(): void;
}

export default class CreateRoom extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: ''
        };

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
                        onChange={(ev) => (this.setState({ name: ev.target.value }))}
                    />
                </div>
                <p className="help is-danger">{this.props.errorMessage}</p>
            </div>
        );
    }
    render() {
        const { onCancel, errorMessage } = this.props;
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
                            errorMessage !== '' ? this.errorInput() : this.normalInput()
                        }
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-success"
                            onClick={() => (this.props.onCreate(this.state.name))}
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
