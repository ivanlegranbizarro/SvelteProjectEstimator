<script>
  import { createEventDispatcher } from 'svelte';
  import materialStore from './material-store';

  let materials = [];
  materialStore.subscribe((items) => {
    materials = items;
  });

  // format price to $
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  // reactive Total
  $: total = materials.reduce((acc, curr) => acc + curr.price, 0);

  // dispatch event
  const dispatch = createEventDispatcher();

  // edit function
  function edit(id, material, price) {
    dispatch('edit', { id, material, price });
  }

  // remove function
  function remove(id) {
    materialStore.remove(id);
  }
</script>

<div class="my-5">
  <table class="table text-center">
    <thead>
      <tr>
        <th>Material</th>
        <th>Price</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {#each materials as material (material.id)}
        <tr on:click={edit(material.id, material.material, material.price)}>
          <td>{material.material}</td>
          <td>{formatter.format(material.price)}</td>
          <td
            ><i
              class="bi bi-trash"
              on:click|stopPropagation={remove(material.id)}
            /></td
          >
        </tr>
      {/each}
      <tr>
        <td><b>Total:</b></td>
        <td
          ><b>
            {formatter.format(total)}
          </b></td
        >
      </tr>
    </tbody>
  </table>
</div>

<style>
  tr {
    cursor: pointer;
  }
  tr:last-of-type {
    cursor: inherit;
  }
</style>
