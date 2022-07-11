import React, { useEffect, useState } from 'react';
import { Activity } from '../../Models/activity';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../featuers/activities/daashboard/ActivityDashboard';
import agent from './../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from './../stors/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../featuers/home/HomePage';
import { Route, Routes, useLocation } from "react-router-dom";
import ActivityForm from '../../featuers/activities/form/ActivityForm';
import ActivityDetails from './../../featuers/activities/Detailes/ActiviyDetails';
import TestErrors from './../../featuers/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from './../../featuers/errors/NotFound';
import ServerError from '../../featuers/errors/ServerError';
function App() {
  let location = useLocation();
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])
  return (
    <>
      <ToastContainer position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Routes key={location.key}>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/activities/:id' element={<ActivityDetails />} />
          <Route path='/createActivity' element={<ActivityForm />} />
          <Route path='/manage/:id' element={<ActivityForm />} />
          <Route path='/errors' element={<TestErrors />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/ServerError' element={<ServerError />} />
        </Routes>

      </Container>
    </>
  );
}

export default observer(App);
