<script>
    import resume from '$lib/pdf/resume.pdf';
</script>

<title>Resume</title>

<div class="container">
    <iframe title="Resume" src={resume} />
</div>

<style>
    .container {
        margin: auto;
    }

    iframe {
        width: 100%;
        min-height: 80vh;
        margin-left: auto;
        margin-right: auto;
        left: 0;
    }
</style>
