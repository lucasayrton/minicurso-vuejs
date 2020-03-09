<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="alunos"
      sort-by="nome"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Alunos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Novo Aluno</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome do Aluno"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail do Aluno"
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.cpf"
                        label="CPF"
                        v-mask="mascaraCpf"
                        :rules="[rules.required, rules.cpf]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.dataNascimento"
                        label="Data de Nascimento"
                        v-mask="mascaraData"
                        :rules="[rules.required, rules.data]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data: () => ({
    mascaraData: "##/##/####",
    mascaraCpf: "###.###.###-##",
    rules: {
      required: value => !!value || "Campo obrigatório",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail inválido";
      },
      cpf: value => {
        /* eslint-disable-next-line */
        const pattern = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        return pattern.test(value) || "CPF inválido";
      },
      data: value => {
        const pattern = /^\d{2}\/\d{2}\/\d{4}/;
        return pattern.test(value) || "Data inválida";
      }
    },
    dialog: false,
    headers: [
      {
        text: "Nome do Aluno",
        align: "start",
        sortable: false,
        value: "nome"
      },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Data de Nascimento", value: "dataNascimento" },
      { text: "Ações", value: "action", sortable: false }
    ],
    alunos: [],
    editedId: -1,
    editedItem: {
      id: null,
      nome: "",
      email: "",
      cpf: null,
      dataNascimento: ""
    },
    defaultItem: {
      id: null,
      nome: "",
      email: "",
      cpf: null,
      dataNascimento: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedId === -1 ? "Novo Aluno" : "Editar Aluno";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("http://localhost:3000/alunos")
        .then(response => (this.alunos = response.data))
        .catch(err => console.error(err));
    },

    editItem(item) {
      this.editedId = this.alunos.find(aluno => aluno.id === item.id).id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.alunos.findIndex(a => a.id === item.id);
      confirm("Você tem certeza que deseja excluir este aluno?") &&
        axios
          .delete(`http://localhost:3000/alunos/${item.id}`)
          .then(this.alunos.splice(index, 1))
          .catch(err => console.error(err));
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedId = -1;
      }, 300);
    },

    save() {
      if (this.editedId > -1) {
        axios
          .put(`http://localhost:3000/alunos/${this.editedId}`, this.editedItem)
          .then(
            Object.assign(
              this.alunos[this.alunos.findIndex(a => a.id === this.editedId)],
              this.editedItem
            )
          )
          .catch(err => console.error(err));
      } else {
        axios
          .post("http://localhost:3000/alunos", this.editedItem)
          .then(response => this.alunos.push(response.data))
          .catch(err => console.error(err));
      }
      this.close();
    }
  }
};
</script>

<style lang="scss">
.container {
  margin-top: 20px;
}
</style>
