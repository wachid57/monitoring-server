<template>
  <div>
    <h2>Dashboard</h2>
    <p>Selamat datang di dashboard!</p>
    <ProxyManager />
  </div>
</template>

<script>
import ProxyManager from './ProxyManager.vue'

export default {
  components: { ProxyManager },
  created() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push('/login')
    }
  }
}
</script>
