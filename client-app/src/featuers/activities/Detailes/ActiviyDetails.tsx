import React, { useEffect } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stors/store';
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
interface props {

}
export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            loadActivity(id)
        }
    }, [id, loadActivity])
    if (loadingInitial || !activity) return <LoadingComponent />;
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
                    <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'></Button>
                    <Button as={Link} to={`/activities`} basic color='grey' content='Cancel'></Button>
                </Button.Group>
            </Card.Content>
        </Card>);
}
)

