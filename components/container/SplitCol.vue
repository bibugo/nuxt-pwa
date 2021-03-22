<template>
  <v-container fluid fill-height align-start pa-0>
    <v-row no-gutters class="fill-height">
      <v-col class="pa-2 col-12 col-md-3 col-xl-2" :style="`height: ${$vuetify.breakpoint.mdAndUp ? '100%' : 'auto'}; overflow-y: auto;`">
          A<br />
      </v-col>
      <v-divider vertical />
      <v-col class="pa-2 col-12 col-md-9 col-xl-10" :style="`height: ${$vuetify.breakpoint.mdAndUp ? '100%' : 'auto'}; overflow-y: auto;`">
          B<br />
      </v-col>
    </v-row>
  </v-container>
</template>