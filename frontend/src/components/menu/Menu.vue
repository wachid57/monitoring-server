<template>
  <aside class="sidebar">
    <div class="logo">Wcloud</div>
    <ul>
      <router-link v-for="item in menuItems" :key="item.name"
        :to="item.route"
        class="menu-item"
        active-class="active"
        tag="li">
        <span>{{ item.name }}</span>
      </router-link>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', route: '/dashboard' },
        { name: 'Proxy', route: '/proxy' },
        { name: 'SSL', route: '/ssl' },
        { name: 'User', route: '/user' }
      ]
    };
  },
  // No methods needed, handled by <router-link>
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  background: #fff;
  box-shadow: 2px 0 8px rgba(0,0,0,0.04);
  padding: 24px 0;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
.menu-item {
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 6px;
  margin-bottom: 4px;
  transition: background 0.3s, color 0.3s;
  position: relative;
}
.menu-item:hover {
  background: linear-gradient(90deg, #e0e7ff 0%, #f0f4ff 100%);
  color: #7367f0;
}
.menu-item.active {
  background: linear-gradient(90deg, #7367f0 0%, #a8b4ff 100%);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(115,103,240,0.08);
}
</style>
