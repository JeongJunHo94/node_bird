<template>
  <div>
    <nav>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/profile">Profile</nuxt-link>
      <nuxt-link to="/signup">Signnup</nuxt-link>
      <nuxt-link to="/admin">Admin</nuxt-link>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}
</style>
