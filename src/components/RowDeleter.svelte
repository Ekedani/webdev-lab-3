<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'
    import {getContext} from 'svelte';
    import MessageBox from "./MessageBox.svelte";
    import Loader from "./Loader.svelte";

    const {open} = getContext('simple-modal');

    export let filmID;
    let isLoading = false;

    async function handleClick() {
        isLoading = true;
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
            open(MessageBox, {modalText: "Success!"})
            isLoading = false;
        } catch (exception) {
            open(MessageBox, {modalText: "Error has happened!"})
            isLoading = false;
        }
    }
</script>

    <button on:click={handleClick}>Delete</button>
{#if isLoading}
    <Loader/>
{/if}

<style>
    button {
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }

    button:hover {
        background-color: #f44336;
        color: white;
    }
</style>