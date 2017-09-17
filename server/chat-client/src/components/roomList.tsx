
import * as React from 'react';

interface RoomProps extends React.Props<{}> {
    name: string;
    active?: boolean;
    onClick?: (name: string) => void;
}
const Room = (props: RoomProps) => {
    const { name, active, onClick } = props;

    const panelBlock = active ? 'panel-block is-active' : 'panel-block';
    return (
        <a className={panelBlock} onClick={() => (onClick && onClick(name))}>
            <span className="panel-icon">
                <i className="fa fa-group" />
            </span>
            {name}
        </a>
    )
        ;
};

interface Props extends React.Props<{}> {
    names: string[];
    initActiveName: string;
    onSelectRoom?(roomName: string): void;
    onCreateRoom?(): void;
}

interface State {
    searchText: string;
    activeName: string;
}

export default class RoomList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchText: '',
            activeName: props.initActiveName,
        };
    }
    resetFilter() {
        this.setState({ searchText: '' });
    }
    setFilter(searchText: string) {
        this.setState({ searchText });
    }
    setActive(activeName: string) {
        this.setState({ activeName });
        if (this.props.onSelectRoom) {
            this.props.onSelectRoom(activeName);
        }
    }
    createRoom() {
        if (this.props.onCreateRoom) {
            this.props.onCreateRoom();
        }
    }
    filterdRooms() {
        const { searchText, activeName } = this.state;
        const { names } = this.props;
        let rooms = names.filter(s => (s.indexOf(searchText) >= 0))
            .map(s => (
                <Room
                    key={names.indexOf(s)}
                    name={s}
                    active={s === activeName}
                    onClick={() => this.setActive(s)}
                />
            ));
        return rooms;
    }
    render() {
        return (
            <nav className="panel">
                <p className="panel-heading">rooms</p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input
                            className="input is-small"
                            type="text"
                            placeholder="search"
                            onChange={(ev) => { this.setFilter(ev.target.value); }}
                        />
                        <span className="icon is-small is-left">
                            <i className="fa fa-search" />
                        </span>
                    </p>
                </div>
                {
                    this.filterdRooms()
                }

                <div className="panel-block">
                    <button
                        className="button is-primary is-outlined is-fullwidth"
                        onClick={() => this.resetFilter()}
                    >
                        reset all filters
                    </button>
                </div>

                <div className="panel-block">
                    <button 
                        className="button is-primary  is-fullwidth"
                        onClick={() => (this.createRoom())}
                    >
                        Create Room
                    </button>
                </div>
            </nav>
        );
    }
}
