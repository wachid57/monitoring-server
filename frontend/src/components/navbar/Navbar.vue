<template>
  <nav class="navbar">
    <div class="navbar-left">
      <span class="navbar-title">Mini NPM</span>
      <input class="navbar-search" type="text" placeholder="Search..." />
    </div>
    <div class="navbar-right">
      <button class="navbar-icon">
        <i class="fas fa-bell"></i>
      </button>
      <button class="navbar-icon">
        <i class="fas fa-cog"></i>
      </button>
      <div class="navbar-profile">
        <img src="/assets/profile.png" alt="Profile" class="profile-img" />
        <span class="profile-name">Admin</span>
        <div class="profile-dropdown">
          <a href="#">Profile</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.navbar-left {
  display: flex;
  align-items: center;
}
.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 2rem;
}
.navbar-search {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.navbar-right {
  display: flex;
  align-items: center;
}
.navbar-icon {
  background: none;
  border: none;
  margin: 0 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
}
.navbar-profile {
  display: flex;
  align-items: center;
  position: relative;
}
.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}
.profile-name {
  font-weight: 500;
  margin-right: 0.5rem;
}
.profile-dropdown {
  display: none;
  position: absolute;
  top: 40px;
  right: 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 4px;
  overflow: hidden;
  z-index: 10;
}
.navbar-profile:hover .profile-dropdown {
  display: block;
}
.profile-dropdown a {
  display: block;
  padding: 0.5rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}
.profile-dropdown a:hover {
  background: #f5f5f5;
}
</style>
