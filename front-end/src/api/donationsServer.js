class Project {
	constructor({
		name,
		targetSum,
		currentCollected,
		currentNumberOfDoners,
		startDate,
		duration,
	}) {
		this.name = name;
		this.targetSum = targetSum;
		this.currentCollected = currentCollected;
		this.currentNumberOfDoners = currentNumberOfDoners;
		this.startDate = startDate;
		this.duration = duration;
		this.status = 'open';
	}
	get endDate() {
		return new Date(this.startDate.getTime() + 10 * 24 * 3600 * 1000);
	}

	get daysLeft() {
		return Math.ceil(
			(this.endDate.getTime() - Date.now()) / (1000 * 3600 * 24)
		);
	}
	addDonation(amount) {
		if (this.status === 'closed') {
			return {
				closed: true,
			};
		} else if (
			parseInt(this.currentCollected) + parseInt(amount) >
			this.targetSum
		) {
			let toCharge = this.targetSum - this.currentCollected;
			this.currentCollected += toCharge;
			this.currentNumberOfDoners++;
			this.status = 'closed';
			return {
				overflow: true,
				charged: toCharge,
			};
		} else {
			let toCharge = parseInt(amount);
			this.currentCollected += toCharge;
			this.currentNumberOfDoners++;
		}
	}
}

class Donation {
	constructor({ user, project, amount }) {
		this.user = user;
		this.project = project;
		this.amount = amount;
	}
}

let donations = [];

let projects = [
	new Project({
		name: 'Animals',
		targetSum: 1000,
		currentCollected: 0,
		currentNumberOfDoners: 0,
		startDate: new Date(2021, 6 - 1, 27),
		duration: 10,
	}),
];

export async function getData(project, user) {
	return projects[0];
}

export async function donate({ user, project, amount }) {
	const donation = new Donation({ user, project, amount });
	donations = [...donations, donation];
	const currProject = projects.find(item => item.name === project);
	currProject.addDonation(amount);
}
