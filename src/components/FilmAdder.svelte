<script>
    import GraphQLHelper from "../helpers/GraphQLHelper";
    import {GraphQLRequests} from "../helpers/GraphQLRequests";
    import MessageBox from "./MessageBox.svelte";
    import Loader from "./Loader.svelte";
    import {getContext} from "svelte";

    const {open} = getContext('simple-modal');

    let title = '';
    let country = '';
    let year = '';
    let isLoading = false;

    async function handleClick() {
        isLoading = true;
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_InsertFilm(title, country, year));
            open(MessageBox, {modalText: "Success!"})
        } catch (exception) {
            open(MessageBox, {modalText: ("Error: " + exception.message)})
        } finally {
            isLoading = false;
        }
    }
</script>

<div>
    <label>
        Title <input bind:value={title}>
    </label>
    <label>
        Country <input bind:value={country}>
    </label>
    <label>
        Year <input bind:value={year}>
    </label>
    <button on:click={handleClick}>Add Film</button>
</div>
{#if isLoading}
    <Loader/>
{/if}

<style>
    div {
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }

    button {
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }

    button:hover {
        background-color: #f44336;
        color: white;
    }

    @media (max-width: 900px) {
        div {
            flex-direction: column;
            align-items: stretch;
        }
    }
</style>
