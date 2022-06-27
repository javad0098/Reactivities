import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

interface State {

}



export default function ({ inverted = true, content = 'Loading' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
};
