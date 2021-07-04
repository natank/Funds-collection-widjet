import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import theme from '../../styles/theme';
const useStyles = makeStyles({
	root: {
		display: 'block',
		color: theme.palette.blue,
	},
});

export default function EncourageText({ message }) {
	const classes = useStyles();
	return (
		<Typography className={classes.root}>
			<i>{message}</i>
		</Typography>
	);
}
