import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stors/store";
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { v4 as uuid } from 'uuid'

interface props {

}
export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    let navigate = useNavigate();

    const { createActivity, updateActivity, loading, loadingInitial, loadActivity } = activityStore
    const { id } = useParams();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        city: '',
        date: '',
        description: '',
        venue: ''
    });
    useEffect(() => {

        if (id) loadActivity(id).then(
            (activity) => { if (activity) setActivity(activity) }
        )
    }, [id, loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {

            const newActivity = { ...activity, id: uuid() }
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`));
        } else { updateActivity(activity).then(() => navigate(`/activities/${activity.id}`)); }
    }
    function handleInputChenge(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    if (loadingInitial) return <LoadingComponent content='loading activities' />
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChenge} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChenge} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChenge} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChenge} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChenge} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChenge} />
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button as={Link} to='/activities' floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    );
}

)