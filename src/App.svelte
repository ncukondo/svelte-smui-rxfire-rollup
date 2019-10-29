<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import Textfield from "@smui/textfield";
  import Card, { Content } from "@smui/card";
  import { getComments } from "./libs/comments.js";
  import Snackbar, { Label, Actions } from "@smui/snackbar";
  const comments = getComments();
  const comments$ = comments.comments$;
  let comment = "";
  let mySnackbar;

  async function onSubmit(e) {
    await comments.add(comment);
    comment = "";
  }
</script>

<style>
  .cdddd {
    margin: 1rem;
  }
  * :global(.shaped-outlined .mdc-text-field__input) {
    padding-left: 32px;
    padding-right: 32px;
  }
  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
    max-width: calc(100% - 28px * 2);
  }
  * :global(.shaped-outlined + .mdc-text-field-helper-line) {
    padding-left: 32px;
    padding-right: 28px;
  }
</style>

<h1 class="mdc-typography--headline4">Hello with Material-UI!</h1>
{#each $comments$ as comment (comment.id)}
  <div class="cdddd">
    <Card class="cdddd" style="width: 360px;">
      <Content class="mdc-typography--body2">
        <h2 class="mdc-typography--headline6" style="margin: 0;">
          {comment.content}
        </h2>
        <span
          class="mdc-typography--caption"
          style="margin: 0 0 10px; color: #888;">
          {comment.createdAt.toDate().toLocaleString()}
        </span>
        <IconButton
          on:click={() => {
            comment.delete();
            mySnackbar.open();
          }}>
          <Icon class="material-icons">delete</Icon>
        </IconButton>
      </Content>
    </Card>
  </div>
{/each}
<form on:submit|preventDefault={onSubmit}>
  <Textfield
    bind:value={comment}
    label="Comment"
    class="shaped-outlined"
    variant="outlined" />
  <IconButton disabled={comment === ''}>
    <Icon class="material-icons">send</Icon>
  </IconButton>
</form>
<Snackbar bind:this={mySnackbar}>
  <Label>Deleted a comment.</Label>
</Snackbar>
