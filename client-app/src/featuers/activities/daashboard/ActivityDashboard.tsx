import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from './../Detailes/ActiviyDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stors/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/Layout/LoadingComponent';

interface props {
}

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore
    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])
    if (activityStore.loadingInitial) return <LoadingComponent content='loading activities' />
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='10'>
                    <ActivityList />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                        < ActivityDetails />
                    }
                    {editMode &&
                        <ActivityForm />}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
})

