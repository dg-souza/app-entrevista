<template>
  <v-col cols="12" class="mx-auto">
    <v-card v-if="visibilidadeLista">
      <v-card-text>
        <v-col cols="12" class="mx-auto">
          <v-simple-table class="secondary">
            <thead>
              <tr>
                <th class="text-center">Nome</th>
                <th class="text-center">CPF</th>
                <th class="text-center">Telefone</th>
                <th class="text-center">E-mail</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="registro in registros" :key="registro.id">
                <td class="text-center">{{ registro.nome }}</td>
                <td class="text-center">{{ registro.cpf }}</td>
                <td class="text-center">{{ registro.telefone }}</td>
                <td class="text-center">{{ registro.email }}</td>
                <td class="text-center">
                  <v-btn color="error" @click="ModalDelete(registro.cpf)" small
                    >Excluir</v-btn
                  >
                </td>
                <td class="text-center">
                  <v-btn @click="Editar(registro)" dark small>Editar</v-btn>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="NovoCadastro()" color="secondary" dark class="ml-5"
          >Novo Cadastro</v-btn
        >
      </v-card-actions>
    </v-card>
    <form-cadastro
      v-if="visibilidadeCadastro"
      :registroEdit="registroEdit"
      v-on:voltar="Voltar()"
      :isSalvo="isSalvo"
    ></form-cadastro>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text
          >Deseja excluir esse registro?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn dark text @click='Excluir()'>
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import Cadastro from "./Cadastro.vue";

export default {
  name: "Lista",
  components: {
    "form-cadastro": Cadastro,
  },
  data: () => ({
    dialog: false,
    registros: [],
    cpfDelete: '',
    registroEdit: [],
    isSalvo: 0,
    visibilidadeLista: true,
    visibilidadeCadastro: false,
  }),
  created() {
    this.RecuperarCadastros();
  },
  methods: {
    RecuperarCadastros() {
      this.registros = JSON.parse(localStorage.getItem("registro") || "[]");

      this.registroEdit = [];
      this.isSalvo = 0;
    },
    Excluir() {
      const index = JSON.parse(localStorage.getItem("registro")).findIndex(
        (user) => user.cpf == this.cpfDelete
      );
      this.registros.splice(index, 1);
      localStorage.setItem("registro", JSON.stringify(this.registros));

      this.dialog = false

      this.snackbar = true;
      this.text = "Excluido com sucesso";
    },
    Editar(registro) {
      this.registroEdit = [];

      this.registroEdit = registro;

      this.isSalvo = 1;

      this.visibilidadeLista = false;
      this.visibilidadeCadastro = true;
    },
    ModalDelete(cpf) {
      this.dialog = true
      this.cpfDelete = cpf
    },
    NovoCadastro() {
      this.visibilidadeLista = false;
      this.visibilidadeCadastro = true;
    },
    Voltar() {
      this.visibilidadeCadastro = false;
      this.visibilidadeLista = true;
      this.RecuperarCadastros();
    },
  },
};
</script>