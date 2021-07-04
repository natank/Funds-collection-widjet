import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Button } from '@material-ui/core';
import theme from '../../styles/theme';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		gap: '1rem',
		'& button': {
			display: 'block',
			backgroundColor: theme.palette.gray,
			color: theme.palette.grayDark,
			padding: '5px 3px',
			textTransform: 'none',
			width: '50%',
		},
	},
});

export default function ActionsBar() {
	const classes = useStyles();
	return (
		<Container disableGutters className={classes.root}>
			<Button variant='outlined'>Save for later</Button>
			<Button variant='outlined'>Tell your friends</Button>
		</Container>
	);
}
