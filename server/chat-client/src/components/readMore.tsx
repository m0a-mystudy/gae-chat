
import * as React from 'react';

interface Props extends React.Props<{}> {
    isLoading?: boolean;
    onClick(): void;
}

const loading = (flag: boolean | undefined) => flag ? 'button is-fullwidth is-loading' : 'button is-fullwidth';

const ReadMore = (props: Props) => (
    <button
        className={loading(props.isLoading)}
        style={{ marginBottom: '10px' }}
        onClick={() => { props.onClick(); }}
        disabled={props.isLoading}
    >
        ReadMore
    </button>
);

export default ReadMore;