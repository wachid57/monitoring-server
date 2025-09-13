
<template>
  <div class="dashboard-layout">
    <Navbar />
  <Menu />
    <main class="main-content">
      <section class="stats-grid">
        <div class="card">Order<br><b>276k</b></div>
        <div class="card">Sales<br><b>$4,679</b></div>
        <div class="card">Revenue<br><b>425k</b></div>
        <div class="card">Payments<br><b>$2,468</b></div>
        <div class="card">Profile Report<br><b>$84,686</b></div>
      </section>
      <section class="charts">
        <!-- Chart.js or ApexCharts integration here -->
        <div style="height:220px;display:flex;align-items:center;justify-content:center;color:#bbb;">[Chart Area]</div>
      </section>
    </main>
  </div>
</template>


<script>
import Navbar from "../components/navbar/Navbar.vue";
import Menu from "../components/menu/Menu.vue";
export default {
  name: "Dashboard",
  components: {
    Navbar,
    Menu,
  },
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.dashboard-layout { display: flex; min-height: 100vh; background: #f7f9fa; }
.sidebar { width: 220px; background: #fff; box-shadow: 2px 0 8px rgba(0,0,0,0.04); padding: 24px 0; }
.sidebar .logo { font-size: 1.5rem; font-weight: bold; margin-bottom: 32px; text-align: center; }
.sidebar ul { list-style: none; padding: 0; }
.sidebar li { padding: 12px 24px; cursor: pointer; border-radius: 6px; margin-bottom: 4px; transition: background 0.2s; }
.sidebar li:hover { background: #f0f4ff; }
.main-content { flex: 1; padding: 32px; }
.topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.topbar input[type="search"] { padding: 8px 16px; border-radius: 6px; border: 1px solid #e0e0e0; font-size: 1rem; width: 220px; }
.profile { font-weight: 500; color: #555; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px; margin-bottom: 32px; }
.card { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 24px; font-size: 1.1rem; text-align: left; }
.charts { background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); padding: 24px; }
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 16px 32px;
  margin-bottom: 32px;
}
.navbar-left { display: flex; align-items: center; }
.sidebar-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  margin-right: 16px;
  cursor: pointer;
}
.navbar-search {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  font-size: 1rem;
  width: 220px;
}
.navbar-right { display: flex; align-items: center; gap: 16px; }
.navbar-icon {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #888;
  cursor: pointer;
}
.navbar-profile {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}
.profile-name {
  font-weight: 500;
  color: #555;
  margin-right: 6px;
}
.profile-dot {
  width: 8px;
  height: 8px;
  background: #1abc9c;
  border-radius: 50%;
  margin-right: 4px;
  display: inline-block;
}
.profile-menu {
  position: absolute;
  top: 44px;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  min-width: 220px;
  z-index: 10;
  padding: 16px 0;
}
.profile-menu-header {
  display: flex;
  align-items: center;
  padding: 0 16px 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 8px;
}
.profile-menu-name {
  font-weight: 600;
  font-size: 1.1rem;
}
.profile-menu-role {
  font-size: 0.95rem;
  color: #888;
}
.profile-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.profile-menu li {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  color: #444;
  transition: background 0.2s;
}
.profile-menu li:hover {
  background: #f0f4ff;
}
.menu-badge {
  background: #7367f0;
  color: #fff;
  border-radius: 12px;
  font-size: 0.85rem;
  padding: 2px 8px;
  margin-left: 8px;
}
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: 1.2em;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
</style>
