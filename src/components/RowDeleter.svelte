<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'
    import {getContext} from 'svelte';
    import MessageBox from "./MessageBox.svelte";

    const {open} = getContext('simple-modal');

    export let filmID;

    async function handleClick() {
        try{
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
            open(MessageBox, {modalText: "Success!"})
        }catch(exception){
            open(MessageBox, {modalText: "Error has happened!"})
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