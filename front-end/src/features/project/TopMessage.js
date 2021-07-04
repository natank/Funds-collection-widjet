import React from 'react';
import '../../styles/layout/layout.css';
import '../../styles/TopMessage.css';

export default function TopMessage({ message }) {
	return (
		<div className={`bubble , section`}>
			<div>{message}</div>
		</div>
	);
}
