import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, TextField, Container } from '@material-ui/core';
import theme from '../../styles/theme';
const useStyles = makeStyles({
	root: {
		width: '50%',
		position: 'relative',
	},
	currency: {
		position: 'absolute',
		left: '1rem',
		top: '50%',
		transform: 'translateY(-50%)',
		fontWeight: 'bold',
		fontSize: '1.2rem',
		color: theme.palette.grayDark,
	},
	fundValue: {
		paddingLeft: '1.5rem',
		color: theme.palette.black,
		fontWeight: 'bold',
		fontSize: '1.2rem',
		padding: '0',
		'& input': {
			padding: '10px',
		},
	},
});

export default function DonationInput({ value, setValue, maxValue }) {
	const classes = useStyles();
	const onChange = e => {
		const newValue = e.target.value;
		const regExpIsNum = /^[0-9\b]+$/;
		if (newValue === '') {
			setValue(newValue);
		} else if (regExpIsNum.test(newValue) && newValue <= maxValue) {
			setValue(parseInt(e.target.value));
		}
	};

	return (
		<Container disableGutters className={classes.root}>
			<Typography className={classes.currency}>$</Typography>
			<TextField
				variant='outlined'
				value={value <= 0 ? '' : value}
				onChange={onChange}
				InputProps={{
					className: classes.fundValue,
				}}
			/>
		</Container>
	);
}
