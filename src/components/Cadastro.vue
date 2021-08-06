<template>
  <v-col cols="8" class="mx-auto">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="8" class="mx-auto">
            <v-text-field
              label="Nome*"
              required
              v-model="nome"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="mx-auto">
            <v-text-field label="CPF*" required v-model="cpf"></v-text-field>
          </v-col>
          <v-col cols="8" class="mx-auto">
            <v-text-field
              label="Telefone*"
              type="text"
              required
              v-model="telefone"
              v-mask="mask"
            ></v-text-field>
          </v-col>
          <v-col cols="8" class="mx-auto">
            <v-text-field
              label="Email*"
              type="text"
              required
              v-model="email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <small>*Indica os campos obrigatorios</small>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click='Voltar()' dark>Voltar</v-btn>
        <v-btn class='ml-2' @click="Salvar()" dark>Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Cadastro",
  data: () => ({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    salvando: false,
    editando: false,
    snackbar: false,
    text: "",
    mask: "###.###.###-##",
  }),
  methods: {
    Salvar() {
      const validacao = this.Validacao();

      const validacaoCpf = this.ValidarCpf();

      let registros = [];

      if (validacao == true && validacaoCpf == true) {
        let registrosExistentes = JSON.parse(localStorage.getItem("teste"));

        if (registrosExistentes == null) registrosExistentes = [];

        registrosExistentes.push({
          nome: this.nome,
          cpf: this.cpf,
          telefone: this.telefone,
          email: this.email,
        });
        localStorage.setItem("teste", JSON.stringify(registrosExistentes));

        this.dialog = false;
        this.salvando = false;
        this.Voltar()

      } else {
        this.snackbar = true;
        this.text = "Ocorreu um erro";
      }
    },
    ValidarCpf(cpf) {
      let retornoStorage = JSON.parse(localStorage.getItem("teste")).findIndex(
        (user) => user.cpf == cpf
      );

      if (retornoStorage != null) return true;
      else return false;
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
    Voltar() {
        this.$router.push('/')
    }
  },
};
</script>

<style scoped>
</style>