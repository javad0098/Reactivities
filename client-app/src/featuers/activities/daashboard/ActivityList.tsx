import React, { SyntheticEvent } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../Models/activity';
import { useState } from 'react';
import { useStore } from '../../../app/stors/store';
import { observer } from 'mobx-react-lite';
import { loadavg } from 'os';

interface props {

}
export default observer(function ActivityList({ }: props) {
    const { activityStore } = useStore();
    const { deleteActivity, activitiesByDate, loading } = activityStore

    const [target, setTarget] = useState('');
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deleteActivity(id);
    }

    return (<Segment>
        <Item.Group divided>
            {activitiesByDate.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.date}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='view' color='blue'></Button>
                            <Button name={activity.id}
                                onClick={(e) => handleActivityDelete(e, activity.id)}
                                loading={loading && target == activity.id} floated='right' content='delete' color='red'></Button>

                            <Label basic content={activity.category}></Label>
                        </Item.Extra>

                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>);
}
)
