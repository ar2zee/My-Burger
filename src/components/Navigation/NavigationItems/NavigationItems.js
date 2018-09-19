import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/"> Burger Builder </NavigationItem >
        <NavigationItem link="/orders"> Orders </NavigationItem >
        {!props.isAuthenticated 
            ? <NavigationItem link="/auth"> Sign In/Sign Up </NavigationItem >
            : <NavigationItem link="/logout"> Logout </NavigationItem >}
    </ul>
);

export default navigationItems;