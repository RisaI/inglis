<script lang="ts">
	import '@fontsource/nunito-sans';
	import '../app.css';

	let input: string = '';
	let output: string = '';

	async function translate() {
		let response = await fetch('/translate', {
			method: 'POST',
			body: input
		});

		let data: { text: string } = await response.json();

		output = data.text;
	}

	function hotkey(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 'Enter') translate();
	}
</script>

<svelte:head>
	<title>Foneticky.cz</title>
</svelte:head>

<main class="container">
	<h1>Foneticky!</h1>
	<form
		on:submit={(e) => {
			e.preventDefault();
			translate();
		}}
	>
		<textarea rows="10" bind:value={input} on:keypress={hotkey} />
		<div class="center">
			<button type="submit">Přeložit</button>
			<small class="key-hint"> nebo Ctrl+Enter</small>
		</div>
	</form>
	<textarea rows="10" readonly class="output" value={output} />
</main>

<style>
	textarea {
		width: 100%;
		resize: vertical;
		color: inherit;
		outline: none;

		padding: 1em;
		border-radius: 0.75em;
		border-color: #d6f4f6;
	}

	.center {
		margin: 1em auto;
		width: fit-content;
	}

	@media screen and (max-width: 767px) {
		.key-hint {
			display: none;
		}
	}

	button {
		background: none;
		outline: none;

		color: #1d777f;
		border: 2px solid #1d777f;
		border-radius: 1em;
		padding: 1em;

		font-weight: bold;
		cursor: pointer;

		transition: all 0.1s ease;
		-webkit-font-smoothing: subpixel-antialiased;
	}

	button:hover {
		transform: scale(1.025);
		box-shadow: 1px 3px 5px #0f3b4055;
	}

	.container {
		margin-inline: auto;
		max-width: 1000px;
	}

	.output {
		background-color: #eaf9fb;
	}
</style>
