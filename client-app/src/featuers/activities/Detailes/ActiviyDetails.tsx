import React from 'react';
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from './../../../Models/activity';
interface props {
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}
export default function ActivityDetails({ activity, cancelSelectActivity, openForm }: props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'></Button>
                    <Button onClick={cancelSelectActivity} basic color='grey' content='Cancel'></Button>
                </Button.Group>
            </Card.Content>
        </Card>);
}


