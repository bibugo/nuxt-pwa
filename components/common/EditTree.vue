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
      <v-btn-toggle dense rounded borderless group color="primary" class="ml-1">
        <v-btn icon x-small v-model="editable">
          <v-icon v-if="!editable">mdi-pencil-off-outline</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-spacer />
      <v-text-field
        v-model="search"
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
    <v-treeview
      :items="items"
      :search="search"
      :open.sync="openItems"
      dense
      :hoverable="!editingItem"
      open-all
      expand-icon="mdi-chevron-down"
      return-object
      class="v-sheet v-sheet--outlined rounded-0"
    >
      <template v-slot:label="{ item }">
        <v-hover v-slot="{ hover }">
          <div
            class="reveal d-flex align-center cursor-hand"
            style="height: 40px"
            @click="$emit('select', item)"
          >
            {{ item.name }}
            <div
              v-if="editable && hover && !editingItem"
              class="reveal__layer d-flex align-center justify-end"
            >
              <v-btn icon x-small class="mr-2" @click.stop="addItem(item)"
                ><v-icon>mdi-plus-outline</v-icon></v-btn
              >
              <v-btn
                icon
                x-small
                :class="item.id != fixedId ? 'mr-2' : 'mr-8'"
                @click.stop="editItem(item)"
                ><v-icon>mdi-pencil-outline</v-icon></v-btn
              >
              <v-btn
                v-if="item.id != fixedId"
                icon
                x-small
                class="mr-1"
                @click.stop="removeItem(item)"
                ><v-icon>mdi-trash-can-outline</v-icon></v-btn
              >
            </div>
            <div
              v-if="editable && editingItem && editingItem.id == item.id"
              class="reveal__layer d-flex"
              @click.stop
            >
              <v-text-field
                height="40"
                v-model="editingItem.name"
                solo
                dense
                flat
                hide-details
                autofocus
                class="inline-text-field rounded-0 pa-0"
              >
                <template v-slot:append>
                  <v-btn
                    icon
                    x-small
                    class="mr-2"
                    color="error"
                    @click.stop="cancel"
                    ><v-icon>mdi-close-thick</v-icon></v-btn
                  >
                  <v-btn
                    icon
                    x-small
                    class="mr-1"
                    color="success"
                    @click.stop="save(item)"
                    ><v-icon>mdi-check-bold</v-icon></v-btn
                  >
                </template>
              </v-text-field>
            </div>
          </div>
        </v-hover>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
export default {
  props: {
    value: Array,
    title: String,
    height: String,
    uneditable: Boolean,
    filterable: Boolean,
    fixedId: String
  },
  data: () => ({
    editingItem: null,
    search: undefined,
    editable: false,
    openItems: [],
  }),
  computed: {
    items: {
      get() {
        return this.value;
      },
      set() {
        this.$emit("input", this.items);
      },
    },
  },
  methods: {
    addItem(item) {
      if (!item.children) {
        this.$set(item, "children", []);
      }
      const length = item.children.push({ id: "_new_", name: "" });
      this.editingItem = Object.assign({}, item.children[length - 1]);
      this.openItems.push(item);
    },
    editItem(item) {
      this.editingItem = Object.assign({}, item);
    },
    removeItem(item, isnew) {
      let removed = false;
      this.items.splice(
        0,
        this.items.length,
        ...(function recurse(items) {
          return items.filter((el) => {
            if (item.id == el.id) {
              removed = true;
              return false;
            } else if (el.children) el.children = recurse(el.children);
            return true;
          });
        })(this.items)
      );
      if (removed && !isnew) this.$emit("remove", item);
    },
    save(item) {
      if (!!this.editingItem.name.trim() && item.name != this.editingItem.name){
        item.name = this.editingItem.name;
        this.$emit("save", this.editingItem);
      } else if (this.editingItem.id == '_new_') {
        this.removeItem(this.editingItem, true);
      }
      this.editingItem = null;
    },
    cancel() {
      if (this.editingItem.id == '_new_') this.removeItem(this.editingItem, true);
      this.editingItem = null;
    },
  },
};
</script>
