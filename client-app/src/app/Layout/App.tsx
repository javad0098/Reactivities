import React, { useEffect, useState } from 'react';
import { Activity } from '../../Models/activity';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../featuers/activities/daashboard/ActivityDashboard';
import agent from './../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from './../stors/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])




  function handleDeleteActivity(id: string) {

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);

    })

  }
  if (activityStore.loadingInitial) return <LoadingComponent content='loading' />
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard


        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default observer(App);
