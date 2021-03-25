<template>
  <v-container
    fluid
    fill-height
    align-start
    flex-grow-0
    style="overflow-y: auto"
  >
    <slot></slot>
  </v-container>
</template>

<style scoped>
.container.fill-height > .row {
  height: 0px;
}
</style>
