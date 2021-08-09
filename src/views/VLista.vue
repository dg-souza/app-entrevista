<template>
    <div>
        <h1 class='h1 mt-5'>Lista de Cadastros</h1>
        <lista-cadastro id='lista'/>
    </div>
</template>

<script>
import Lista from '../components/Lista.vue'
export default {
    name: 'Lista',
    components: {
        'lista-cadastro' : Lista
    }
}
</script>

<style scoped>
#lista {
    margin-left: 10%;
    margin-top: 2%;
}
</style>