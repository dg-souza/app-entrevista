<template>
  <div id="formulario" data-app>
    <v-card>
      <!-- Lista de cadastros -->
      <v-row>
        <v-col cols='11'>
          <v-simple-table dark class='ml-2'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th> -- </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome</td>
              <td>CPF</td>
              <td>Telefone</td>
              <td>Email</td>
              <td><v-btn dark small color='cyan'>Excluir</v-btn></td>
            </tr>
          </tbody>
        </v-simple-table>
        </v-col>
      </v-row>

      <!-- Modal Cadastro -->
      <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Cadastrar
        </v-btn>
      </template>
      <v-card color='#8C6BED'>
        <v-card-title>
          <span class="text-h5">Novo Cadastro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Nome*"
                  required
                  v-model='nome'
                  autocomplete='off'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="CPF*"
                  required
                  v-model='cpf'
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Telefone*"
                  type="text"
                  required
                  v-model='telefone'
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Email*"
                  type="text"
                  required
                  v-model='email'
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*Indica que o campo é obrigatorio</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="fecharModal()"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Formulario',
    data: () => ({
        dialog: false,
        nome: '',
        cpf: '',
        telefone: '',
        email: ''
    }),
    created() {
      this.listarCadastros()
    },
    methods: {
      fecharModal() {
        this.dialog = false
        this.limparInputs()
      },
      listarCadastros() {
        axios.get('https://api.mocki.io/v1/a2790e8c')
          .then(res => {
            console.log(res.data)
          })
      },
      limparInputs() {
        this.nome = ''
        this.cpf = ''
        this.telefone = ''
        this.email = ''
      }
    }
}
</script>