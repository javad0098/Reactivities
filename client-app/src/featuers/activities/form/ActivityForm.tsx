import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stors/store";
import { Activity } from "../../../Models/activity";
import { observer } from 'mobx-react-lite';
interface props {

}
export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore
    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        city: '',
        date: '',
        description: '',
        venue: ''
    }
    const [activity, setActivity] = useState(intialState);
    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }
    function handleInputChenge(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
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
                <Button onClick={closeForm} floated="right" type="button" content='Cancel' />
            </Form>
        </Segment>
    );
}

)