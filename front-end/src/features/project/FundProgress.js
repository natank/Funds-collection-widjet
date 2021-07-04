import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core';

import { LinearProgress } from '@material-ui/core';

import theme from '../../styles/theme';

const useStyles = makeStyles({
	root: {
		border: `1px solid ${theme.palette.black}`,
	},
});

const BorderLinearProgress = withStyles(() => ({
	root: {
		height: 10,
		borderRadius: 0,
		border: `1px solid ${theme.palette.grayDark}`,
	},
	colorPrimary: {
		backgroundColor: theme.palette.gray,
	},
	bar: {
		borderRadius: 0,
		backgroundColor: theme.palette.orange,
	},
}))(LinearProgress);

export default function FundProgress({ progress }) {
	const classes = useStyles();
	return <BorderLinearProgress variant='determinate' value={progress * 100} />;
	// return <div className={classes.root}>progress: {`${progress * 100}%`}</div>;
}
