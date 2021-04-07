<template>
  <v-container fluid pa-0>
    <v-row
      v-if="filterable"
      no-gutters
      class="align-center justify-end"
      style="border: 1px solid transparent"
    >
      <span v-if="title" class="text-subtitle-1 font-weight-medium pl-3">
        {{ title }}
      </span>
      <v-spacer />
      <v-text-field
        v-model="filter"
        label="搜索"
        prepend-inner-icon="mdi-magnify"
        dense
        single-line
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
        solo
        flat
        style="max-width: 160px"
      >
      </v-text-field>
    </v-row>
    <v-simple-table
      dense
      class="mini-scrollbar v-sheet v-sheet--outlined rounded-0"
      :style="
        lines != -1 ? `overflow-y: overlay;max-height: ${lines * 32 + 2}px` : ''
      "
    >
      <template v-slot:default>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="cursor-hand">
            <v-hover v-slot="{ hover }">
              <v-expand-transition>
                <td class="pa-0 reveal" @click.stop="$emit('click', index)">
                  <span
                    class="d-flex align-center px-3"
                    style="height: 39px; font-size: 16px; line-height: 20px"
                    >{{ item.name }}</span
                  >
                  <div
                    v-if="
                      !uneditable &&
                      hover &&
                      index != editingIndex &&
                      editingIndex === -1
                    "
                    class="reveal__layer d-flex align-center justify-end px-3"
                  >
                    <v-btn
                      icon
                      x-small
                      class="mr-2"
                      @click.stop="addItem(index)"
                      ><v-icon>mdi-plus-outline</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      x-small
                      class="mr-2"
                      @click.stop="editItem(index)"
                      ><v-icon>mdi-pencil-outline</v-icon></v-btn
                    >
                    <v-btn icon x-small @click.stop="removeItem(index)"
                      ><v-icon>mdi-trash-can-outline</v-icon></v-btn
                    >
                  </div>
                  <div
                    v-if="!uneditable && index == editingIndex"
                    class="reveal__layer d-flex"
                    @click.stop
                  >
                    <v-text-field
                      height="39"
                      v-model="editingItem.name"
                      solo
                      dense
                      flat
                      hide-details
                      autofocus
                      class="inline-text-field rounded-0"
                    >
                      <template v-slot:append>
                        <v-btn
                          icon
                          x-small
                          class="mr-2"
                          color="error"
                          @click.stop="cancel(index)"
                          ><v-icon>mdi-close-thick</v-icon></v-btn
                        >
                        <v-btn
                          icon
                          x-small
                          color="success"
                          @click.stop="save(index)"
                          ><v-icon>mdi-check-bold</v-icon></v-btn
                        >
                      </template>
                    </v-text-field>
                  </div>
                </td>
              </v-expand-transition>
            </v-hover>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  props: {
    value: Array,
    lines: { type: Number, default: -1 },
    title: String,
    uneditable: Boolean,
    filterable: Boolean,
  },
  data: () => ({
    editingIndex: -1,
    editingNew: false,
    editingItem: {},
    filter: "",
  }),
  computed: {
    items: {
      get() {
        return this.filter
          ? this.value.filter((v) => v.name.includes(this.filter))
          : this.value;
      },
      set() {
        this.$emit("input", this.items);
      },
    },
  },
  methods: {
    addItem(index) {
      this.items.splice(index, 0, {});
      this.editingNew = true;
      this.editingItem = {};
      this.editingIndex = index;
    },
    editItem(index) {
      this.editingItem = Object.assign({}, this.items[index]);
      this.editingIndex = index;
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    save(index) {
      if (!(this.editingItem.name && this.editingItem.name.trim()))
        return this.cancel(index);
      this.items.splice(index, 1, this.editingItem);
      this.editingNew = false;
      this.editingIndex = -1;
      this.$emit("save", { item: this.editingItem, index });
    },
    cancel(index) {
      if (this.editingNew) this.items.splice(index, 1);
      this.editingNew = false;
      this.editingIndex = -1;
    },
  },
};
</script>

