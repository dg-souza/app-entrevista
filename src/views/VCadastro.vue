<template>
    <div>
        <h1 class='h1'>Novo Cadastro</h1>
        <v-app>
            <cadastro-componente  id='cadastro'></cadastro-componente>
        </v-app>
    </div>
</template>

<script>
import Cadastro from '../components/Cadastro.vue'

export default {
    name: 'Cadastro',
    components: {
        'cadastro-componente' : Cadastro
    }
}
</script>

<style scoped>

</style>
