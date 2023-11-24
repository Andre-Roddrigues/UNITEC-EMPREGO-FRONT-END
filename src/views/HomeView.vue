<template>
    <div>
      <h1>Bem-vindo à Página Inicial</h1>
      <p>Esta é a página inicial do nosso site.</p>
      <router-link to="/login">
        <button class="button">Ir para a página de login</button>
      </router-link>
      <router-link to="/sms">
        <button class="button">Ir para a página de Resetar Senha</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
  };
  </script>
  <style>
  button {
  width: 30%;
  height: 50px;
  background: #131419;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 5px 15px;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  color: #03a9f4;
  box-shadow:inset -5px -5px 10px rgba(255, 255, 255, 0.05),
             inset  5px 5px 15px rgba(0, 0, 0, 0.5);
}
button:hover {
  cursor: pointer;
  box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
               5px 5px 15px rgba(0, 0, 0, 0.5);

}
</style>