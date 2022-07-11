import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import { Activity } from './../../Models/activity';
import activityStore from './../stors/ActivityStore';
import { useStore } from './../stors/store';



export default function NavBar() {
    const navigate = useNavigate();
    const { activityStore } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"></Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name="errors"></Menu.Item>

                <Menu.Item>
                    <Button onClick={() => { navigate("/createActivity") }} positive content='Create Activitiy' />
                </Menu.Item> 
            </Container>
        </Menu>
    )
}