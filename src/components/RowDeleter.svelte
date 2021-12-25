<script>
    import {GraphQLRequests} from '../helpers/GraphQLRequests'
    import GraphQLHelper from '../helpers/GraphQLHelper'

    export let filmID;
    async function handleClick(){
        alert('Handled');
        await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_DeleteFilmById(filmID));
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