import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Project from './features/project/Project';

const useStyles = makeStyles({
	root: {
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default function App() {
	const classes = useStyles();
	return (
		<Container className={classes.root}>
			<Project />
		</Container>
	);
}
