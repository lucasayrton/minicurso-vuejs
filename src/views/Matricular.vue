<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="matriculas"
      sort-by="nome"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Matrículas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Matricular Aluno</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Matricular Aluno</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="alunos"
                        item-text="nome"
                        label="Nome do Aluno"
                        :rules="[rules.required]"
                        v-model="editedItem.nomeAluno"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        :items="cursos"
                        item-text="nome"
                        label="Nome do Curso"
                        :rules="[rules.required]"
                        v-model="editedItem.nomeCurso"
                      ></v-select>
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
    rules: {
      required: value => !!value || "Campo obrigatório"
    },
    dialog: false,
    headers: [
      {
        text: "Nome do Aluno",
        align: "start",
        value: "nomeAluno"
      },
      { text: "Curso", value: "nomeCurso" }
    ],
    alunos: [],
    cursos: [],
    matriculas: [],
    editedId: -1,
    editedItem: {
      id: null,
      nomeAluno: null,
      nomeCurso: null
    },
    defaultItem: {
      id: null,
      nomeAluno: null,
      nomeCurso: null
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
        .get("http://localhost:3000/matriculas")
        .then(response => {
          this.matriculas = response.data;
          this.carregarAlunosDasMatriculas();
          this.carregarCursosDasMatriculas();
        })
        .catch(err => console.error(err));
    },

    carregarAlunosDasMatriculas() {
      axios
        .get("http://localhost:3000/alunos")
        .then(response => (this.alunos = response.data))
        .catch(err => console.error(err));
    },

    carregarCursosDasMatriculas() {
      axios
        .get("http://localhost:3000/cursos")
        .then(response => (this.cursos = response.data))
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
      axios
        .post("http://localhost:3000/matriculas", this.editedItem)
        .then(response => this.matriculas.push(response.data))
        .catch(err => console.error(err));
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
