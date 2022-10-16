<header>
    <div class="navbar bg-primary text-base-content rounded-xl">
    <div class="navbar-start">
        <div class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a class="navbar-text" href="/resume">Resume</a></li>
            <li><a class="navbar-text" href="/blog">Blog</a></li>
            <li><a class="navbar-text" href="/contact">Contact Me</a></li>
        </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl" href="/">Andrew Chaney</a>
    </div>
    <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal p-0">
            <li><a class="navbar-text" href="/resume">Resume</a></li>
            <li><a class="navbar-text" href="/blog">Blog</a></li>
            <li><a class="navbar-text" href="/contact">Contact Me</a></li>
        </ul>
    </div>
    </div>
</header>

<style>
    header {
        margin: 0.5vh;
    }

    .navbar-text {
        font-weight: 550;
    }

    a:hover {
        color: hsl(var(--a));
    }
</style>