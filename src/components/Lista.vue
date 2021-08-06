<template>
  <div id="formulario" data-app>
    <!-- Lista de cadastros -->
    <v-row>
      <v-btn @click='NovoCadastro()' dark class='ml-5'>Novo Cadastro</v-btn>
      <v-col cols="11">
        <v-simple-table dark class="ml-2">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>--</th>
              <th>--</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registro in registros" :key="registro.id">
              <td>{{ registro.nome }}</td>
              <td>{{ registro.cpf }}</td>
              <td>{{ registro.telefone }}</td>
              <td>{{ registro.email }}</td>
              <td>
                <v-btn @click="Excluir(registro.cpf)" dark small>Excluir</v-btn>
              </td>
              <td>
                <v-btn @click="AbrirModal(registro, 1)" dark small
                  >Editar</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Lista",
  data: () => ({
    dialog: false,
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    registros: [],
    salvando: false,
    editando: false,
    snackbar: false,
    text: "",
    mask: '###.###.###-##'
  }),
  created() {
    this.listarCadastros();
  },
  methods: {
    AbrirModal(verificacao) {
      if (verificacao == 2) {
        this.salvando = true;
        this.dialog = true;
      } else {
        this.editando = true;
        this.dialog = true;
      }
    },
    fecharModal() {
      this.dialog = false;
      this.salvando = false;
      this.editando = false;
      this.limparInputs();
    },
    listarCadastros() {
      this.registros = JSON.parse(localStorage.getItem("teste") || "[]");
    },
    Salvar() {
      const validacao = this.Validacao();

      const validacaoCpf = this.ValidarCpf()

      if (validacao == true && validacaoCpf == true) {
        this.registros.push({
          nome: this.nome,
          cpf: this.cpf,
          telefone: this.telefone,
          email: this.email,
        });
        localStorage.setItem("teste", JSON.stringify(this.registros));

        this.dialog = false;
        this.salvando = false;
        this.limparInputs();
        
        this.snackbar = true;
        this.text = "Cadastrado com sucesso";
      } else {
        this.snackbar = true;
        this.text = "Ocorreu um erro";
      }
    },
    Excluir(cpf) {
      const index = JSON.parse(localStorage.getItem("teste")).findIndex(
        (user) => user.cpf == cpf
      );
      this.registros.splice(index, 1);
      localStorage.setItem("teste", JSON.stringify(this.registros));

      this.snackbar = true;
      this.text = "Excluido com sucesso";
    },
    limparInputs() {
      this.nome = "";
      this.cpf = "";
      this.telefone = "";
      this.email = "";
    },
    ValidarCpf(cpf) {
      let retornoStorage = JSON.parse(localStorage.getItem('teste')).findIndex((user) => user.cpf == cpf)

      if(retornoStorage != null)
        return true
      else
        return false
    },
    Validacao() {
      if (
        this.nome != "" &&
        this.cpf != "" &&
        this.telefone != "" &&
        this.email != ""
      )
        return true;
      else return false;
    },
    NovoCadastro() {
      this.$router.push('/cadastrar')
    }
  },
};
</script>

<style scoped>
.button {
  margin-left: 10px;
}
</style>