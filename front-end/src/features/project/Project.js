import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';

import * as donationsAPI from '../../api/donationsServer';
import TopMessage from './TopMessage';
import DonateForm from './DonateForm';
import ActionsBar from './ActionsBar';
import FundProgress from './FundProgress';

const useStyles = makeStyles({
	root: {
		width: '300px',
	},
});

function Project({ user, project = 'Animals' }) {
	const classes = useStyles();

	const [donationStatus, setDonationStatus] = useState(); //, pending, fulfilled
	const [data, setData] = useState(null);
	const [refreshData, setRefreshData] = useState(true);

	useEffect(() => {
		if (refreshData) {
			getInitialData();
		}
		async function getInitialData() {
			try {
				const result = await donationsAPI.getData();
				result.missingBudget = result.targetSum - result.currentCollected;
				result.missingMessage = `$${result.missingBudget} still needed for this project`;

				setRefreshData(false);
				setData(result);
			} catch (err) {
				throw err;
			}
		}
	}, [refreshData]);

	useEffect(() => {
		switch (donationStatus) {
			case 'pending':
				break;
			case 'fulfilled':
				break;
			default:
				break;
		}
	}, [donationStatus]);

	async function donate({ amount }) {
		try {
			const response = await donationsAPI.donate({
				amount,
				project,
			});
			setRefreshData(true);
		} catch (err) {
			throw err;
		}
	}

	return data ? (
		<div className={classes.root}>
			<TopMessage message={data.missingMessage} />
			<FundProgress progress={data.currentCollected / data.targetSum} />
			<DonateForm
				daysLeft={data.daysLeft}
				donate={donate}
				doners={data.currentNumberOfDoners}
				missingBudget={data.missingBudget}
			/>
			<ActionsBar />
		</div>
	) : null;
}

export default Project;
