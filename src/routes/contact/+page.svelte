<script>
    import { emailValidator, requiredValidator } from './validators.js';
    import { createFieldValidator } from './validation.js';

    // Validation for email-field
    const [ email_validity, email_validate ] = createFieldValidator(
        requiredValidator(), emailValidator()
    );
    let email = null;

    // Validation for subject-field
    const [ subject_validity, subject_validate ] = createFieldValidator(
        requiredValidator()
    );
    let subject = null;

    // Validation for message-field
    const [ message_validity, message_validate ] = createFieldValidator(
        requiredValidator()
    );
    let message = null;
</script>

<title>Contact Me</title>

<section>
    <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center">Contact Me</h2>
        <p class="mb-8 lg:mb-16 font-light text-center sm:text-xl">Have a comment? Want to get in touch? Reach out and let me know.</p>
        <form action="https://getform.io/f/07a31429-d42c-4efe-a66f-3c9f69a9e2ff" method="POST" class="space-y-8">
            <div>
                <label for="email" class="block mb-2 text-sm font-medium">Your email</label>
                <input
                    type="email"
                    bind:value={email}
                    class:input-error={!$email_validity.valid && $email_validity.dirty}
                    class:input-success={$email_validity.valid}
                    name="email"
                    placeholder="someone@example.com"
                    class="input input-bordered text-sm w-full p-2.5 bg-base-200"
                    use:email_validate={email}
                />
                {#if $email_validity.dirty && !$email_validity.valid}
                <span class="label-text-alt text-error">
                    Please enter a valid email.
                </span>
                {/if}
            </div>
            <div>
                <label for="subject" class="block mb-2 text-sm font-medium">Subject</label>
                <input
                    id="subject-field"
                    type="text"
                    bind:value={subject}
                    class:input-error={!$subject_validity.valid && $subject_validity.dirty}
                    class:input-success={$subject_validity.valid}
                    name="subject"
                    placeholder="Something catchy here."
                    class="input input-bordered text-sm w-full p-2.5 bg-base-200"
                    use:subject_validate={subject}
                />
                {#if $subject_validity.dirty && !$subject_validity.valid}
                <span class="label-text-alt text-error">
                    Please enter a subject.
                </span>
                {/if}
            </div>
            <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                <textarea
                    type="text"
                    bind:value={message}
                    class:textarea-error={!$message_validity.valid && $message_validity.dirty}
                    class:textarea-success={$message_validity.valid}
                    name="message"
                    placeholder="Leave a comment..."
                    class="textarea textarea-bordered text-sm w-full p-2.5 bg-base-200"
                    use:message_validate={message}
                />
                {#if $message_validity.dirty && !$message_validity.valid}
                <span class="label-text-alt text-error">
                    Please enter a subject.
                </span>
                {/if}
            </div>
            <button
                type="submit"
                class="btn btn-outline"
                disabled={!$email_validity.valid || !$subject_validity.valid || !$message_validity.valid}
                >
                Send
            </button>
        </form>
    </div>
</section>