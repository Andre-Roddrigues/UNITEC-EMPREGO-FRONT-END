<template>
    <div>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="senha " placeholder="Password">
        <button type="submit">Login</button>
        <p v-if="loginError">Erro ao fazer login. Verifique suas credenciais.</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        senha: '',
        loginError: false
      };
    },
    created() {
      localStorage.setItem('isLoggedIn', 'false');
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('https://backend.unitec.ac.mz/loginadmin', {
            username: this.username,
            senha : this.senha 
          });
          if (response.data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            this.$router.push({ name: 'HomeView' });
          } else {
            this.loginError = true;
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          this.loginError = true;
        }
      }
    }
  }
  </script>