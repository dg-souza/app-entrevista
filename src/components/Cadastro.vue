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
            <v-text-field-cpf
              label="CPF*"
              required
              v-model="cpf"
              :options="{
                outputMask: '##############',
                inputMask: '##############',
                empty: null,
                apllyAfter: true,
              }"
            ></v-text-field-cpf>
          </v-col>
          <v-col cols="8" class="mx-auto">
            <v-text-field-simplemask
              label="Telefone"
              type="text"
              required
              :options="{
                inputMask: '(##)#####-####',
                outputMask: '(##)#####-####',
                empty: null,
                apllyAfter: true,
              }"
              v-model="telefone"
            ></v-text-field-simplemask>
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
        <v-btn @click="Voltar()" dark>Voltar</v-btn>
        <v-btn class="ml-2" color="success" @click="Salvar()" dark
          >Salvar</v-btn
        >
      </v-card-actions>
      <v-snackbar v-model="snackbar" :timeout="2000">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "Cadastro",
  props: ["registroEdit", "isSalvo"],
  data: () => ({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    text: "",
    snackbar: false
  }),
  created() {
    this.Iniciar();
  },
  methods: {
    Iniciar() {
      if (this.isSalvo == 1) {
        this.nome = this.registroEdit.nome;
        this.cpf = this.registroEdit.cpf;
        this.telefone = this.registroEdit.telefone;
        this.email = this.registroEdit.email;
      }
    },
    Salvar() {
      const validacao = this.Validacao();

      const validaCpf = this.ValidarCpf(this.cpf);

      if (this.isSalvo != 1) {
        if (validacao == true) {
          if (validaCpf == true) {
            const retorno = this.RegistroUnico(this.cpf);

            if (retorno == true) {
              let registrosExistentes = JSON.parse(
                localStorage.getItem("registro")
              );

              if (registrosExistentes == null) registrosExistentes = [];

              registrosExistentes.push({
                nome: this.nome,
                cpf: this.cpf,
                telefone: this.telefone,
                email: this.email,
              });
              localStorage.setItem(
                "registro",
                JSON.stringify(registrosExistentes)
              );

              this.Voltar();
            } else {
              this.snackbar = true;
              this.text = "CPF já cadastrado";
            }
          } else {
            this.snackbar = true;
            this.text = "CPF invalido";
          }
        } else {
          this.snackbar = true;
          this.text = "Preencha todos os campos";
        }
      } else {
        if (validacao == true) {
          if (validaCpf == true) {
            const retorno = this.RegistroUnico(this.cpf);

            if (retorno == true) {
              let registros = JSON.parse(localStorage.getItem("registro"));

              let index = JSON.parse(
                localStorage.getItem("registro")
              ).findIndex((user) => user.cpf == this.registroEdit.cpf);

              registros.splice(index, 1);

              registros.push({
                nome: this.nome,
                cpf: this.cpf,
                telefone: this.telefone,
                email: this.email,
              });

              localStorage.setItem("registro", JSON.stringify(registros));

              this.Voltar();
            } else {
              this.snackbar = true;
              this.text = "CPF já cadastrado";
            }
          } else {
            this.snackbar = true;
            this.text = "CPF invalido";
          }
        } else {
          this.snackbar = true;
          this.text = "Preencha todos os campos";
        }
      }
    },
    ValidarCpf(cpf) {
      let Soma;
      let Resto;
      Soma = 0;
      if (cpf == "00000000000") return false;

      for (let i = 1; i <= 9; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpf.substring(9, 10))) return false;

      Soma = 0;
      for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(cpf.substring(10, 11))) return false;
      return true;
    },
    RegistroUnico(cpf) {
      let retorno = JSON.parse(localStorage.getItem("registro")).findIndex(
        (user) => user.cpf == cpf
      );

      if (retorno >= 0 && this.registroEdit.cpf != cpf) return false;
      else return true;
    },
    Validacao() {
      if (
        this.nome != "" &&
        this.cpf != "" &&
        this.telefone != '' &&
        this.email != ""
      )
        return true;
      else return false;
    },
    Voltar() {
      this.$emit("voltar");
    },
  },
};
</script>