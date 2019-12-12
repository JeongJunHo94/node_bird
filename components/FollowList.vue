<template>
  <v-list-item>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <span>{{ item.name }}</span>
        <v-icon @click="deleteItem(index, type)"
          >mdi-minus-circle-outline</v-icon
        >
      </li>
    </ul>
  </v-list-item>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    type: {
      type: String
    }
  },
  methods: {
    deleteItem(index, type) {
      this.$store.dispatch("users/removeFollow", {
        index,
        type
      });
    }
  }
};
</script>

<style></style>
