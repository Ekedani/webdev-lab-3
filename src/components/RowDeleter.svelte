<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'
    import {getContext} from 'svelte';
    import MessageBox from "./MessageBox.svelte";
    import {isLoading} from "../store";

    const {open} = getContext('simple-modal');

    export let filmID;

    async function handleClick() {
        isLoading.set(true);
        try {
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
            open(MessageBox, {modalText: "Success!"})
        } catch (exception) {
            open(MessageBox, {modalText: ("Error: " + exception.message)})
        }finally {
            isLoading.set(false);
        }
    }
</script>

    <button on:click={handleClick}>Delete</button>

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
