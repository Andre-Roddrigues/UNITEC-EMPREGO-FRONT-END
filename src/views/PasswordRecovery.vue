<template>
    <div v-if="isLoggedIn">
        <div class="container">
            <div class="row">
                <h2 class="mt-5 text-center">Resetar Senha</h2>
                <form @submit.prevent="editPassword">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="email" class="form-control"
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Por favor, insira um email válido" required />
                    </div>
                    <div class="form-group">
                        <label for="newPassword">Nova Senha:</label>
                        <input type="password" id="newPassword" :class="{
                            'red-border': senha !== Csenha && senha && Csenha || !isPasswordValid(senha),
                            'green-border': senha === Csenha && senha && Csenha && isPasswordValid(senha)
                        }" v-model="senha" class="form-control" pattern="(?=.*[A-Z]).{4,}"
                            title="A senha deve ter pelo menos 4 caracteres e incluir uma letra maiúscula" required />
                        <span v-if="senha !== Csenha && senha && Csenha || !isPasswordValid(senha)" style="color: red;">
                            {{ passwordErrorMessage }}
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Senha:</label>
                        <input type="password" id="confirmPassword"
                            :class="{ 'red-border': senha !== Csenha && senha && Csenha || (Csenha && Csenha.length < 4) || (Csenha && !/(?=.*[A-Z]).{4,}/.test(Csenha)), 'green-border': senha === Csenha && senha && Csenha && Csenha.length >= 4 && /(?=.*[A-Z]).{4,}/.test(Csenha) }"
                            v-model="Csenha" class="form-control" pattern="(?=.*[A-Z]).{4,}"
                            title="A senha deve ter pelo menos 4 caracteres e incluir uma letra maiúscula" required />
                        <span v-if="senha !== Csenha && senha && Csenha" style="color: red;">Senha não coincide*</span>
                    </div>

                    <button type="submit" class="btn btn-block" :disabled="senha !== Csenha">Confirmar Senha</button>
                </form>
                <router-link to="/login" class="forget">Faça Login</router-link>
                <!-- <div class="line-container">
                    <hr>
                    <span class="or-text">ou</span>
                    <hr>
                </div> -->
            </div>
            <div v-if="successMessage">{{ successMessage }}</div>
            <div v-if="errorMessage">{{ errorMessage }}</div>
        </div>
    </div>
    <div v-else>
        <div class="container">
            <p v-if="showMessage">Você precisa estar logado para redefinir a senha. Redirecionando para a página de login...
            </p>
            <router-link v-if="showMessage" :to="{ name: 'LoginTeste' }" @click="redirectAfterDelay">Ir para a página de
                login</router-link>
        </div>
    </div>
</template>
  
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import axios from 'axios';
export default {
    name: 'PasswordRecovery',
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            showMessage: true,
            email: '',
            senha: '',
            Csenha: '',
            successMessage: '',
            errorMessage: ''
        };
    },
    mounted() {
        setTimeout(() => {
            this.showMessage = false;
            this.redirectAfterDelay();
        }, 5000);
    },
    computed: {
    passwordErrorMessage() {
      if (!this.isPasswordValid(this.senha)) {
        return "A senha deve ter pelo menos 4 caracteres e incluir uma letra maiúscula";
      } else if (this.senha !== this.Csenha) {
        return "Senha não coincide";
      }
      return "";
    }
  },
    methods: {
        isPasswordValid(password) {
      return password && password.length >= 4 && /(?=.*[A-Z])/.test(password);
    },
        redirectAfterDelay() {
            setTimeout(() => {
                this.$router.push({ name: 'LoginTeste' });
            }, 5000000);
        },
        async editPassword() {
            try {
                const authToken = sessionStorage.getItem('auth-token');

                const response = await axios.put('https://backend.unitec.ac.mz/editarSenha', {
                    email: this.email,
                    senha: this.senha
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                if (response.data.success) {
                    this.successMessage = 'Senha redefinida com sucesso!';
                    this.errorMessage = '';
                    console.log('Senha Alterada')
                } else {
                    this.errorMessage = response.data.message || 'Erro ao redefinir a senha.';
                    this.successMessage = '';
                }
            } catch (error) {
                this.errorMessage = error.message || 'Erro ao redefinir a senha.';
                this.successMessage = '';
            }
        }
    },
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #d6d6d6;
}

.container {
    position: relative;
    width: 450px;
    padding: 40px 40px 40px;
    background-color: #0017b0;
    border-radius: 10px;
    text-align: center;
    /* box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5); */
}

.container h2 {
    color: #ffffff;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 4px;
}

.red-border {
    border: 3px solid rgb(255, 0, 0);
}

.green-border {
    border: 3px solid green;
}

.container form {
    text-align: left;
    margin-top: 40px;
}

.container form .form-group {
    margin-top: 20px;
}

.container form .form-group label {
    display: block;
    color: #fff;
    margin: 5px;
    font-size: 18px;

}

.container form .form-group input:active {
    border: none;
}

.container form .form-group input {
    width: 100%;
    height: 50px;
    background: #ffffff;
    /* border: none; */
    outline: none;
    border-radius: 10px;
    padding: 5px 15px;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
    color: #03a9f4;
    /* box-shadow: inset -5px -5px 10px rgba(243, 220, 220, 0.05),
    inset 5px 5px 15px rgba(0, 0, 0, 0.5); */
}

.container form button {
    width: 100%;
    height: 50px;
    background: #02abfa;
    border-radius: 8px;
    padding: 5px 15px;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
    color: #fff;
    margin-top: 40px;
}

.container form button:hover {
    border: 2px solid #02abfa;
    color: #fff;
}

.container .row .cadastrobtn {
    width: 100%;
    height: 50px;
    background: transparent;
    border: 2px solid #02abfa;
    outline: none;
    border-radius: 8px;
    padding: 5px 15px;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
    color: #fff;
    margin-top: 20px;
}

.container form .btn[type="submit"] {
    cursor: pointer;
    /* box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5); */

}

.container form .btn [type="submit"]:active {
    cursor: pointer;
    color: black;
    /* box-shadow: inset -5px -5px 10px rgba(255, 255, 255, 0.05),
    inset 5px 5px 15px rgba(0, 0, 0, 0.5); */

}

.forget {
    margin-top: 30px;
    color: #fff;
}

.line-container {
    display: flex;
    align-items: center;
}

hr {
    flex: 1;
    margin: 0 5%;
    height: 4px;
    background-color: #fff;
}

.or-text {
    flex: 0;
    width: 20%;
    text-align: center;
    color: #fff;
}
</style>