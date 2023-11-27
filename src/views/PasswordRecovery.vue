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
                        <input type="password" id="newPassword"
                            :class="{ 'red-border': senha !== Csenha && senha && Csenha || (senha && senha.length < 4) || (senha && !/(?=.*[A-Z]).{4,}/.test(senha)), 'green-border': senha === Csenha && senha && Csenha && senha.length >= 4 && /(?=.*[A-Z]).{4,}/.test(senha) }"
                            v-model="senha" class="form-control" pattern="(?=.*[A-Z]).{4,}"
                            title="A senha deve ter pelo menos 4 caracteres e incluir uma letra maiúscula" required />
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
                <div class="line-container">
                    <hr>
                    <span class="or-text">ou</span>
                    <hr>
                </div>
                <button type="submit" class="btn btn-block cadastrobtn" :disabled="senha !== Csenha">Cadastrar-se</button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Você precisa estar logado para redefinir a senha. Redirecionando para a página de login...</p>
        <router-link :to="{ name: 'LoginTeste' }">Ir para a página de login</router-link>
    </div>
</template>
  
<script>
export default {
    name: 'PasswordRecovery',
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
        };
    },
    created() {
        if (!this.isLoggedIn) {
            this.$router.push({ name: 'LoginTeste' });
        }
    }
}
</script>
  