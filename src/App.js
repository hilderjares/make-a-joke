import React, { useState, useEffect } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import './App.css';

const useStyle = () => ({
	flippy: { width: '200px', height: '200px', color: '#0D111B' },
	front: { backgroundColor: '#F6F7F8' },
	back: { backgroundColor: '#F6F7F8' }
})

function App() {
	const classes = useStyle();
	const [joke, setJoke] = useState();
	const [message, setMessage] = useState("Grab a random joke!");

	useEffect(() => {
		(async function () {
			const response = await fetch('https://official-joke-api.appspot.com/random_joke');
			const data = await response.json();

			setJoke(data);
		})();
	}, []);

	const getJoken = async () => {
		setMessage("Loading...");
		const response = await fetch('https://official-joke-api.appspot.com/random_joke');
		const data = await response.json();

		setJoke(data);
		setMessage("Grab a random joke!");
	};

	return (
		<div className="app">
			<div>
				<Flippy
					flipOnClick={true}
					flipDirection="horizontal"
					style={classes.flippy}
				>
					<FrontSide style={classes.front}>
						{joke && joke.setup}
					</FrontSide>
					<BackSide style={classes.back}>
						{joke && joke.punchline}
					</BackSide>
				</Flippy>
			</div>
			<div>
				<button
					className="app-button"
					onClick={getJoken}
				>
					{message}
				</button>
			</div>
		</div>
	);
}

export default App;
