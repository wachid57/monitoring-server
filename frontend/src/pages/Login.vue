<template>
  <div id="cloud-container"></div>
  <div class="login-container">
    <div class="login-logo">
      <img src="@/assets/img/logo_wpm.svg" alt="Wcloud Logo" />
    </div>
    <div class="login-title">Wcloud Proxy Manager</div>
    <form @submit.prevent="login" id="login-form">
      <input class="login-input" v-model="username" type="text" name="username" placeholder="Username" required />
      <input class="login-input" v-model="password" type="password" name="password" placeholder="Password" required />
      <button class="login-btn" type="submit">SIGN IN</button>
    </form>
    <div id="login-error" v-if="error" style="color:red">{{ error }}</div>
    <div class="login-footer" id="signup-footer" v-if="showSignup">
      <a href="/signup">SIGN UP</a>
    </div>
  </div>
  <div id="wave-container"></div>
</template>


<script>
import { BACKEND_URL } from '@/config/constants.js';
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showSignup: false
    }
  },
  methods: {
    async login() {
      try {
        const res = await fetch(BACKEND_URL + 'login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username, password: this.password })
        })
        const data = await res.json()
        if (data.token) {
          localStorage.setItem('token', data.token)
          this.$router.push('/dashboard')
        } else {
          this.error = data.error || 'Login gagal'
        }
      } catch (e) {
        this.error = 'Login gagal'
      }
    }
  },
  mounted() {
    import('@/assets/js/wave.js');
    // Simulasi cek signup (bisa diganti dengan API sesuai kebutuhan)
    fetch(BACKEND_URL + 'enable-signup')
      .then(res => res.json())
      .then(data => {
        if (data && (data.enable_sign_up === 1 || data.enable_sign_up === true)) {
          this.showSignup = true;
        }
      });
  }
}
</script>

<style src="@/assets/css/login.css"></style>
<style>

</style>
