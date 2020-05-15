<template>
  <div class="card">
    <div class="card-content">
      <component :is="inner" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inner: {},
  },
}
</script>
