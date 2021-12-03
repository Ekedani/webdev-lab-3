<script>
    export let films;
</script>

<table>
    {#if $films.loading}
        <h1>Loading...</h1>
    {:else if $films.error}
        <h1>Error!</h1>
    {:else if $films.data}
        <tr>
            <th>Title</th>
            <th>Country</th>
            <th>Release Year</th>
        </tr>
        {#each $films.data.Films as film}
            <tr>
                <td>{film.title}</td>
                <td>{film.country}</td>
                <td>{film.release_year}</td>
            </tr>
        {/each}
    {/if}
</table>

<style>
    table {
        border-collapse: collapse;
        width: 50%;
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
        background-color: #ff3e00;
        color: white;
    }

</style>