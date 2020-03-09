<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="cursos"
      sort-by="nome"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Cursos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Novo Curso</v-btn
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
                        label="Nome do Curso"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.vagas"
                        label="Quantidade Máxima de Vagas"
                        :rules="[rules.required]"
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

export default {
  data: () => ({
    rules: {
      required: value => !!value || "Campo obrigatório"
    },
    dialog: false,
    headers: [
      {
        text: "Nome do Curso",
        align: "start",
        sortable: false,
        value: "nome"
      },
      { text: "Quantidade Máxima de Vagas", value: "vagas" },
      { text: "Ações", value: "action", sortable: false }
    ],
    cursos: [],
    editedId: -1,
    editedItem: {
      id: null,
      nome: "",
      vagas: null
    },
    defaultItem: {
      id: null,
      nome: "",
      vagas: null
    }
  }),

  computed: {
    formTitle() {
      return this.editedId === -1 ? "Novo Curso" : "Editar Curso";
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
        .get("http://localhost:3000/cursos")
        .then(response => (this.cursos = response.data))
        .catch(err => console.error(err));
    },

    editItem(item) {
      this.editedId = this.cursos.find(curso => curso.id === item.id).id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.cursos.findIndex(a => a.id === item.id);
      confirm("Você tem certeza que deseja excluir este curso?") &&
        axios
          .delete(`http://localhost:3000/cursos/${item.id}`)
          .then(this.cursos.splice(index, 1))
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
          .put(`http://localhost:3000/cursos/${this.editedId}`, this.editedItem)
          .then(
            Object.assign(
              this.cursos[this.cursos.findIndex(c => c.id === this.editedId)],
              this.editedItem
            )
          )
          .catch(err => console.error(err));
      } else {
        axios
          .post("http://localhost:3000/cursos", this.editedItem)
          .then(response => this.cursos.push(response.data))
          .catch(err => console.error(err));
      }
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  margin-top: 20px;
  width: 50% !important;
}
</style>
