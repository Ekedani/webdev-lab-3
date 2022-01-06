<script>
    import GraphQLHelper from "../helpers/GraphQLHelper";
    import {GraphQLRequests} from "../helpers/GraphQLRequests";
    import MessageBox from "./MessageBox.svelte";
    import Loader from "./Loader.svelte";
    import {getContext} from "svelte";
    import {isLoading} from "../store";

    const {open} = getContext('simple-modal');

    let title = '';
    let country = '';
    let year = '';

    async function handleClick() {
        try {
            isLoading.set(true);
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_InsertFilm(title, country, year));
            open(MessageBox, {modalText: "Success!"})
        } catch (exception) {
            open(MessageBox, {modalText: ("Error: " + exception.message)})
        } finally {
            isLoading.set(false);
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

<style>
    div {
        align-self: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 75%;
    }

    button {
        background-color: var(--element-background);
        color: var(--button-text);
        border: 2px solid var(--main-color);
    }

    button:hover {
        background-color: var(--main-color);
        color: var(--button-text-hover);
    }

    @media (max-width: 900px) {
        div {
            flex-direction: column;
            align-items: stretch;
        }
    }
</style>
