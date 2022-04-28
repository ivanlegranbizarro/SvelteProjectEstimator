<script>
  import materialStore from './material-store';
  export let id;
  export let material = '';
  export let price;

  $: mode = id ? 'Edit' : 'Add';
  $: canSubmit = material && price ? (canSubmit = true) : (canSubmit = false);
  $: color = canSubmit ? 'primary' : 'secondary';

  // Function
  function submit() {
    if (!canSubmit) {
      return;
    }
    if (mode === 'Add') {
      materialStore.add(material, price);
    }

    if (mode === 'Edit') {
      materialStore.edit(id, material, price);
    }

    price = '';
    material = '';
    id = undefined;
  }

  function cancel() {
    price = '';
    material = '';
    id = undefined;
  }
</script>

<form on:submit|preventDefault={submit}>
  <div class="my-5">
    <label for="material" class="form-label">Material</label>
    <input
      placeholder="wood, glue, etc..."
      type="text"
      class="form-control"
      id="material"
      bind:value={material}
    />
  </div>
  <div class="my-3">
    <label for="price" class="form-label">Price</label>
    <input
      min="0"
      step="any"
      placeholder="price"
      type="number"
      class="form-control"
      id="price"
      bind:value={price}
    />
  </div>
  <button disabled={!canSubmit} type="submit" class="btn btn-{color} btn-block"
    >{mode}</button
  >
  {#if mode === 'Edit'}
    <button
      type="submit"
      class="btn btn-danger btn-block mt-2"
      on:click={cancel}>Cancel</button
    >
  {/if}
</form>

<style>
  button {
    width: 100%;
  }
  button:disabled {
    cursor: not-allowed;
  }
</style>
