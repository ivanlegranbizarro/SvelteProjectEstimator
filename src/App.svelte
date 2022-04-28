<script>
  import Form from './Form.svelte';
  import Table from './Table.svelte';
  let id;
  let material;
  let price;
  // functions
  function edit(event) {
    ({ id, material, price } = event.detail);
  }
  function remove(event) {
    ({ id } = event.detail);
  }
</script>

<main class="container">
  <h1 class="my-5">Project Estimator</h1>
  <Form bind:price bind:id bind:material />
  <Table on:edit={edit} on:remove={remove} />
</main>

<style>
  main {
    flex: 1;
    align-content: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
  }
</style>
