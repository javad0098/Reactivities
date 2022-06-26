import React, { PureComponent } from 'react';
import { Grid, List } from 'semantic-ui-react';
import ts from 'typescript';
import { Activity } from '../../../Models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from './../Detailes/ActiviyDetails';
import ActivityForm from '../form/ActivityForm';
interface props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void
    cancelSelectActivity: () => void
    editMode: Boolean;
    openForm: (id: string) => void;
    closeForm: () => void
    createOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void

}
export default function ActivityDashboard({ activities, selectedActivity,
    selectActivity, cancelSelectActivity, createOrEdit, editMode, openForm, closeForm, deleteActivity }: props) {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='10'>
                    <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}
                    />
                </Grid.Column>
                <Grid.Column width='6'>
                    {selectedActivity && !editMode &&
                        < ActivityDetails activity={selectedActivity}
                            cancelSelectActivity={cancelSelectActivity}
                            openForm={openForm} />
                    }
                    {editMode &&
                        <ActivityForm closeForm={closeForm} activity={selectedActivity}
                            createOrEdit={createOrEdit} />}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

