import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../Models/activity';
interface props {
    activities: Activity[]
    selectActivity: (id: string) => void,
    deleteActivity: (id: string) => void
}
export default function ActivityList({ activities, selectActivity, deleteActivity }: props) {
    return (<Segment>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>


                    <Item.Content>
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.date}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => selectActivity(activity.id)} floated='right' content='view' color='blue'></Button>
                            <Button onClick={() => deleteActivity(activity.id)} floated='right' content='delete' color='red'></Button>

                            <Label basic content={activity.category}></Label>
                        </Item.Extra>

                    </Item.Content>
                </Item>
            ))}
        </Item.Group>
    </Segment>);
}

