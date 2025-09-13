<template>
  <div>
    <h3>SSL Management</h3>
    <form @submit.prevent="generateSSL">
      <input v-model="domain" placeholder="Domain" required />
      <button type="submit">Generate SSL</button>
      <p v-if="status">Status: {{ status }}</p>
    </form>
    <h4>Daftar SSL</h4>
    <ul>
      <li v-for="ssl in sslList" :key="ssl.domain">
        <b>{{ ssl.domain }}</b> - {{ ssl.status }}<br>
        Cert: {{ ssl.certPath }}<br>
        Key: {{ ssl.keyPath }}
      </li>
    </ul>
  </div>
</template>

<script>
import { BACKEND_URL } from '@/config/constants.js';
export default {
  data() {
    return {
      domain: '',
      status: '',
      sslList: []
    }
  },
  created() {
    this.fetchSSLList()
  },
  methods: {
    async generateSSL() {
      const token = localStorage.getItem('token')
  const res = await fetch(BACKEND_URL + 'ssl/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ domain: this.domain })
      })
      const data = await res.json()
      this.status = data.status
      this.fetchSSLList()
    },
    async fetchSSLList() {
      const token = localStorage.getItem('token')
  const res = await fetch(BACKEND_URL + 'ssl/list', {
        headers: { 'Authorization': token }
      })
      const data = await res.json()
      this.sslList = Array.isArray(data) ? data : []
    }
  }
}
</script>
