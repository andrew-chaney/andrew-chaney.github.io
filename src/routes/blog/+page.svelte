<script>
    export let data;

    // Was running into issues with my date object being altered with timezones. 
    // This is my duct-tape solution.
    let months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    function date_string(d) {
        let date = new Date(d);
        let day = date.getDate() + 1;
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
</script>

<title>Blog</title>

<ul>
    <div class="flex flex-col w-full">
    {#each data.posts as post, i}
        <li>
            <h2><a class="btn btn-ghost normal-case text-xl md:text-2xl" href={post.path}>{post.meta.title}</a></h2>
            <p class="text-sm md:text-m">&emsp; Published {date_string(post.meta.date)}</p>
        </li>
        {#if (data.posts.length - 1) > i}
            <div class="divider"></div>
        {/if}
    {/each}
    </div>
</ul>

<style>
    ul {
        margin-top: 0.5vh;
        margin-bottom: 0.5vh;
        margin-left: 1.5vw;
        margin-right: 1.5vw;
    }

    a {
        color: black;
        /* color: hsl(var(--n)); */
    }

    a:hover {
        color: hsl(var(--n));
        /* color: purple; */
    }

    p {
        color: grey;
    }

    img {
        margin-left: auto;
        margin-right: auto;
    }
</style>