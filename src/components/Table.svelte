<script>
    import RowDeleter from "./RowDeleter.svelte";
    import Loader from "./Loader.svelte";
    export let films;
</script>

<table>
    {#if $films.loading}
        <Loader/>
    {:else if $films.error}

    {:else if $films.data}
        <tr>
            <th>Title</th>
            <th>Country</th>
            <th>Release Year</th>
            <th>Deletion</th>
        </tr>
        {#each $films.data.Films as film}
            <tr>
                <td>{film.title}</td>
                <td>{film.country}</td>
                <td>{film.release_year}</td>
                <td><RowDeleter filmID={film.id}/></td>
            </tr>
        {/each}
    {/if}
</table>

<style>
    table {
        border-collapse: collapse;
        width: 70%;
        align-self: center;
        font-weight: 100;
    }

    table td, table th {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    table th {
        padding-top: 12px;
        padding-bottom: 12px;
        background-color: #f44336;
        color: white;
    }

</style>