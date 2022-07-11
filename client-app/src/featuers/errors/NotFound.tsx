import * as React from 'react';
import { Icon, Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
export default function NotFound() {
    return (<Segment placeholder>
        <Header icon>
            <Icon name='search' />
            Oops- we've looked at av
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/activities' primary>
                Return to activities
            </Button>
        </Segment.Inline>
    </Segment>);
}


