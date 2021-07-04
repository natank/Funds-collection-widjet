import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, Button, Container } from '@material-ui/core';

import DonationInput from './DonationInput';
import EncourageText from './EncourageText';
import theme from '../../styles/theme';
import '../../styles/layout/layout.css';
const useStyles = makeStyles({
	root: {
		border: `1px solid ${theme.palette.grayDark}`,
		height: `16rem`,
		padding: '1rem',
	},
	message: {
		marginBottom: '1rem',
		color: theme.palette.grayDark,
		'& em': {
			color: theme.palette.orange,
			fontWeight: 'bold',
		},
	},
	donateInputContainer: {
		display: 'flex',
		gap: '1rem',
		alignItems: 'stretch',
	},
	giveNow: {
		color: '#fff',
		backgroundColor: theme.palette.green,
		width: '50%',
		fontSize: '1rem',
		textTransform: 'capitalize',
	},
});

let encourageTimeout;
export default function DonateForm({
	daysLeft,
	donate,
	doners,
	missingBudget,
}) {
	const classes = useStyles();
	const [amount, setAmount] = useState(-1);
	const [encourage, setEncourage] = useState({ display: false, message: '' });

	function onAmountChange() {
		const isDispaly = parseInt(amount) && parseInt(amount) > -1;
		if (amount / missingBudget < 0.1) {
			setEncourage({
				display: isDispaly,
				message: `Why give $${amount}?`,
			});
		} else if (amount / missingBudget < 0.5) {
			setEncourage({
				display: isDispaly,
				message: `$${amount} is very nice`,
			});
		} else {
			setEncourage({
				display: isDispaly,
				message: `$${amount} will be wonderfull!`,
			});
		}
	}

	function onDonate() {
		donate({ amount });
		setAmount(0);
	}

	useEffect(() => {
		if (amount > -1) {
			clearTimeout(encourageTimeout);
			encourageTimeout = setTimeout(onAmountChange, 1000);
		}
	}, [amount]);

	function renderDonersMessage() {
		let message = '';
		if (doners === 0) {
			message =
				'Become the first supporter of this project! This is a great opportunity to save the life of many animals';
		} else if (doners < 10) {
			message =
				'Become an early supporter of this project and create the momentum for others. Donate now';
		} else {
			message =
				'Join the {doners} other donors who have already supported this project.  every dollar helps';
		}
		return <Typography className={classes.message}>{message}</Typography>;
	}
	return (
		<Container disableGutters className={`section ${classes.root}`}>
			<Typography className={classes.message}>
				<em>Only {daysLeft} days</em> left to fund this project
			</Typography>
			{renderDonersMessage()}
			<Container
				disableGutters
				className={`section ${classes.donateInputContainer}`}>
				<DonationInput
					value={amount}
					setValue={setAmount}
					maxValue={missingBudget}
				/>
				<Button onClick={onDonate} className={classes.giveNow}>
					Give Now
				</Button>
			</Container>
			{encourage.display ? <EncourageText message={encourage.message} /> : null}
		</Container>
	);
}
