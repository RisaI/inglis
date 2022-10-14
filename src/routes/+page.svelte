<script lang="ts">
    let input: string = '';
    let output: string = '';

    async function translate() {
        let response = await fetch(
            '/translate',
            {
                method: 'POST',
                body: input
            }
        );

        let data: { text: string } = await response.json();

        output = data.text;
    }
</script>

<main class="container">
    <h1>Ingliš</h1>
    <form on:submit={e => { e.preventDefault(); translate(); }}>
        <textarea rows="10" bind:value={input} />
        <div class="center">
            <button type="submit">Přeložit</button>
        </div>
    </form>
    <textarea rows="10" readonly class="output" value={output} />
</main>

<style>
    :global(body) {
        margin: 0;
    }

    textarea {
        width: 100%;
        resize: vertical;
    }

    .center {
        margin-inline: auto;
        width: fit-content;
    }

    .container {
        margin-inline: auto;
        max-width: 1000px;
    }

    .output {
        margin-top: 1em;
    }
</style>