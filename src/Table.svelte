<script>
    export let films;
</script>

<table>
    <tr>
        <th>Title</th>
        <th>Country</th>
        <th>Release Date</th>
    </tr>
    {#each films as film, i}
        <tr>
            <td>{film.title}</td>
            <td>{film.country}</td>
            <td>{film.release_date}</td>
        </tr>
    {/each}
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