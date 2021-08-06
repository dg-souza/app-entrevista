<template>
    <div>
        <h1 class='h1'>Tela de Cadastro</h1>
        <formulario id='cadastro'/>
    </div>
</template>

<script>
import Formulario from '../components/Formulario.vue'
export default {
    name: 'Cadastro',
    components: {
        'formulario' : Formulario
    }
}
</script>

<style scoped>
#cadastro {
    padding-left: 5%;
    padding-top: 5%;
}
</style>