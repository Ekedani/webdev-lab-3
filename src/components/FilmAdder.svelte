<script>
    import GraphQLHelper from "../helpers/GraphQLHelper";
    import {GraphQLRequests} from "../helpers/GraphQLRequests";
    import Message from "./Message.svelte";
    import { isLoading, modal } from '../store';
    import { bind } from 'svelte-simple-modal';

    const defaultValue = '';

    let title = defaultValue;
    let country = defaultValue;
    let year = defaultValue;

    function resetValues(){
        title = defaultValue;
        country = defaultValue;
        year = defaultValue;
    }

    async function handleClick() {
        try {
            $isLoading++;
            // I also have these check on hasura, it's just additional safety for not sending invalid requests
            if(!title || !year){
                throw Error("Title and year fields must be filled!");
            }
            if(!Number.isInteger(+year) || +year <= 0 || +year >= 10000){
                throw Error("Year must be integer from 1 to 9999!");
            }
            await GraphQLHelper.startExecuteMyMutation(GraphQLRequests.MUTATION_InsertFilm(title, country, year));
            $modal = bind(Message, {message: "Success!"})
            resetValues();
        } catch (exception) {
            $modal = bind(Message, { message: ("Error: " + exception.message)});
        } finally {
            $isLoading--;
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

    @media (max-width: 640px) {
        div {
            flex-direction: column;
            align-items: stretch;
        }
        button, input{
            width: 100%;
        }
    }
</style>
