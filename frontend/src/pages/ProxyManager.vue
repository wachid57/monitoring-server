import { BACKEND_URL } from '@/config/constants.js';
<template>
  <div>
    <h3>Proxy Management</h3>
    <form @submit.prevent="addProxy">
      <input v-model="domain" placeholder="Domain" required />
      <input v-model="target" placeholder="Target IP/Port" required />
      <button type="submit">Add Proxy</button>
    </form>
    <ul>
      <li v-for="proxy in proxies" :key="proxy.id">
        {{ proxy.domain }} &rarr; {{ proxy.target }}
        <button @click="removeProxy(proxy.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      domain: '',
      target: '',
      proxies: []
    }
  },
  created() {
    this.fetchProxies()
  },
  methods: {
    async fetchProxies() {
      const token = localStorage.getItem('token')
      const res = await fetch(BACKEND_URL + 'proxies', {
        headers: { 'Authorization': token }
      })
      const data = await res.json()
      this.proxies = Array.isArray(data) ? data : []
    },
    async addProxy() {
      const token = localStorage.getItem('token')
      const res = await fetch(BACKEND_URL + 'proxies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ domain: this.domain, target: this.target })
      })
      if (res.ok) {
        await this.fetchProxies()
        this.domain = ''
        this.target = ''
      }
    },
    async removeProxy(id) {
      const token = localStorage.getItem('token')
      const res = await fetch(`${BACKEND_URL}proxies/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
      })
      if (res.ok) {
        await this.fetchProxies()
      }
    }
  }
}
</script>
