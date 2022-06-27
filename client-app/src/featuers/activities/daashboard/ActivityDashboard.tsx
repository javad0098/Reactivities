import React, { PureComponent } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ts, { couldStartTrivia } from 'typescript';
import { Activity } from '../../../Models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './../Detailes/ActiviyDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stors/store';
import { observer } from 'mobx-react-lite';

interface props {
}

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore
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

