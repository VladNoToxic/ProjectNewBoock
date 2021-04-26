<template>
  <div class="book container">
    <h1>Панель админа</h1>
    <b-tabs content-class="mt-3" @activate-tab="onChangeTab">
      <b-tab title="Книги">
        <div class="d-flex align-items-center justify-content-end mb-2">
          <v-select
            v-model="perPage"
            :options="[10, 20, 30]"
            :clearable="false"
            class="mr-3"
            @option:selected="updateTable('book')"
          />
          <b-button
            variant="outline-primary"
            class="mr-3"
            @click="updateTable('book')"
          >
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
          <b-button variant="outline-primary"
          @click="openmodal('book')">
            <feather-icon icon="PlusIcon" />
          </b-button>
        </div>
        <b-overlay
          :show="loading"
          variant="transparent"
          opacity="1"
          blur="3px"
          rounded="sm"
        >
          <b-table
            hover
            :items="data.list"
            :fields="fields"
            responsive
            show-empty
          >
            <template #cell(actions)="data">
              <b-dropdown variant="link" no-caret>
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="align-middle text-body"
                  />
                </template>
                <b-dropdown-item
                  :to="{ name: 'Book', params: { id: data.item.id } }"
                >
                  <feather-icon icon="FileTextIcon" />
                  <span class="align-middle ml-50">Подробнее</span>
                </b-dropdown-item>

                <b-dropdown-item @click="editmodal('book',data.item.id)">
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Изменить</span>
                </b-dropdown-item>

                <b-dropdown-item @click="deleteRow('book',data.item.id)">
                  <feather-icon icon="TrashIcon" />
                  <span class="align-middle ml-50">Удалить</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
          <b-pagination
            v-model="page"
            :total-rows="data.count"
            :per-page="perPage"
            first-number
            last-number
            @change="(pages) => updateNavigation(pages,'book')"
          ></b-pagination>
        </b-overlay>
      </b-tab>
      <b-tab title="Авторы"
        ><div class="d-flex align-items-center justify-content-end mb-2">
          <v-select
            v-model="perPage"
            :options="[10, 20, 30]"
            :clearable="false"
            class="mr-3"
            @option:selected="updateTable('author')"
          />
          <b-button
            variant="outline-primary"
            class="mr-3"
            @click="updateTable('author')"
          >
            <feather-icon icon="RefreshCcwIcon" />
          </b-button>
          <b-button variant="outline-primary" @click="openmodal('author')">
            <feather-icon icon="PlusIcon" />
          </b-button>
        </div>
        <b-overlay
          :show="loading"
          variant="transparent"
          opacity="1"
          blur="3px"
          rounded="sm"
        >
          <b-table
            hover
            :items="data.list"
            :fields="fields"
            responsive
            show-empty
          >
            <template #cell(actions)="data">
              <b-dropdown variant="link" no-caret>
                <template #button-content>
                  <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="align-middle text-body"
                  />
                </template>
                <b-dropdown-item @click="editmodal('author',data.item.id)">
                  <feather-icon icon="EditIcon" />
                  <span class="align-middle ml-50">Изменить</span>
                </b-dropdown-item>

                <b-dropdown-item  @click="deleteRow('author',data.item.id)">
                  <feather-icon icon="TrashIcon"/>
                  <span class="align-middle ml-50">Удалить</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
          <b-pagination
            v-model="page"
            :total-rows="data.count"
            :per-page="perPage"
            first-number
            last-number
            @change="(pages) => updateNavigation(pages,'author')"
          ></b-pagination> </b-overlay
      ></b-tab>
    </b-tabs>
    <b-modal :id="val.name" v-for="(val, indexs) of modal" :key="indexs" :title="val.title" @show="(val.name === 'book')? getoption():null">
        <template #modal-footer>
            <b-button variant="danger" @click="closemodal(val.name)">
              <span >Закрыть</span>
            </b-button>
            <b-button variant="outline-primary" @click="postmodal(val.name)">
              <span v-if="!modalloading">Отправить</span>
              <b-spinner v-else small label="Отправка"></b-spinner>
            </b-button>
        </template>

        <b-form>
          <b-row>
          <b-col :lg="prop.col" v-for="(prop, index) of val.props" :key="index">
            <b-form-group
              :label="prop.label"
              :label-for="prop.id"
              :description="prop.description"
            >
              <v-select
                v-if="prop.type === 'select'"
                v-model="val.value[prop.id]"
                :id="prop.id"
                @search="(search,_) => {if(!prop.not_new) searchoption(search,{name:val.name,options:prop.id})}"
                :options="val.options[prop.id]"
              ></v-select>
              <b-form-file
                v-else-if="prop.type === 'file'"
                v-model="val.value[prop.id]"
                plain
              ></b-form-file>
              <b-textarea
                v-else-if="prop.type === 'textarea'"
                v-model="val.value[prop.id]"
                :id="prop.id"
                size="lg"
                :placeholder="prop.placeholder"
              ></b-textarea>
              <b-form-input
                v-else
                :id="prop.id"
                v-model="val.value[prop.id]"
                :required="prop.required"
                :min="prop.min"
                :max="prop.max"
                :disabled="(prop.primarykey != null && !creatingmodal)"
                :placeholder="prop.placeholder"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { HTTP } from '../http.js'
import FeatherIcon from './FeatherIcon'
export default {
  name: 'Admin',
  components: {
    'feather-icon': FeatherIcon
  },
  data: () => {
    return {
      data: {},
      modal: {
        book: {
          name: 'book',
          options: {
            author: ['1'],
            genre: ['1'],
            creators: ['1']
          },
          title: 'Добавление книги',
          props: {
            art: {
              id: 'art',
              label: 'Артикул:',
              description:
                'Введение артикула не обязательно, возможна генерация',
              placeholder: 'Артикул',
              type: 'number',
              min: 0,
              max: 1000000,
              col: 6,
              required: false,
              primarykey: true
            },
            name: {
              id: 'name',
              label: 'Название:',
              placeholder: 'Название',
              type: 'text',
              col: 6,
              required: true
            },
            image: {
              id: 'image',
              label: 'Обложка:',
              placeholder: 'Обложка',
              type: 'file',
              col: 6,
              required: true
            },
            author: {
              id: 'author',
              label: 'Автор:',
              placeholder: 'Начинайте вводить фамилию автора',
              not_new: true,
              type: 'select',
              col: 6,
              required: true
            },
            year: {
              id: 'year',
              label: 'Год издания:',
              placeholder: 'Год издания',
              type: 'number',
              min: 100,
              max: 2022,
              col: 6,
              required: true
            },
            pages: {
              id: 'pages',
              label: 'Кол-во страниц:',
              placeholder: 'Кол-во страниц',
              type: 'number',
              col: 6,
              min: 1,
              required: true
            },
            creators: {
              id: 'creators',
              label: 'Издатель:',
              col: 6,
              description:
                'Если нету нужного издателя, введите и нажмите Enter',
              placeholder: 'Издатель',
              not_new: false,
              type: 'select',
              required: true
            },
            genre: {
              id: 'genre',
              label: 'Жанр:',
              description: 'Если нету нужного жанра, введите и нажмите Enter',
              placeholder: 'Жанр',
              not_new: false,
              type: 'select',
              col: 6,
              required: true
            },
            amount: {
              id: 'amount',
              label: 'Тираж:',
              placeholder: 'Тираж',
              type: 'number',
              col: 6,
              min: 1,
              required: true
            },
            type_front: {
              id: 'type_front',
              label: 'Тип обложки:',
              placeholder: 'Тип обложки',
              col: 6,
              type: 'text',
              required: true
            },
            cost: {
              id: 'cost',
              label: 'Стоимость:',
              placeholder: 'Стоимость',
              col: 6,
              type: 'number',
              min: 1,
              required: true
            },
            annotation: {
              id: 'annotation',
              label: 'Аннотация:',
              placeholder: 'Аннотация',
              type: 'textarea',
              col: 12,
              required: true
            }
          },
          value: {
            art: null,
            name: null,
            author: null,
            year: null,
            pages: null,
            creators: null,
            genre: null,
            amount: null,
            type_front: null,
            cost: null,
            annotation: null
          }
        },
        author: {
          name: 'author',
          title: 'Добавление автора',
          props: {
            firstName: {
              id: 'firstName',
              label: 'Имя:',
              placeholder: 'Имя',
              type: 'text',
              col: 12,
              required: true
            },
            lastName: {
              id: 'lastName',
              label: 'Фамилия:',
              placeholder: 'Фамилия',
              type: 'text',
              col: 12,
              required: true
            },
            otchestvo: {
              id: 'otchestvo',
              label: 'Отчество:',
              placeholder: 'Отчество',
              col: 12,
              type: 'text'
            }
          },
          value: {
            firstName: null,
            lastName: null,
            otchestvo: null
          }
        }
      },
      loading: true,
      modalloading: false,
      creatingmodal: false,
      perPage: 10,
      page: 1,
      fields: [
        {
          key: 'id',
          label: 'Артикул'
        },
        {
          key: 'name',
          label: 'Название'
        },
        {
          key: 'cost',
          label: 'Стоимость'
        },
        {
          key: 'author',
          label: 'Автор'
        },
        {
          key: 'actions',
          label: 'Действия'
        }
      ]
    }
  },
  methods: {
    openmodal (name) {
      this.creatingmodal = true
      this.modal[name].title = `Добавить ${(name === 'book') ? 'книгу' : 'автора'}`
      Object.keys(this.modal[name].value).forEach(key => { this.modal[name].value[key] = null })
      this.$bvModal.show(name)
    },
    closemodal (name) {
      this.$bvModal.hide(name)
      this.modalloading = false
    },
    editmodal (name, id) {
      this.creatingmodal = false
      this.modal[name].title = `Изменить ${(name === 'book') ? 'книгу' : 'автора'}`
      HTTP.get(`${name}/get`, {params: { id: id }}).then(res => {
        this.modal[name].value = res.data
        this.$bvModal.show(name)
      })
    },
    deleteRow (name, id) {
      HTTP.post(`${name}/delete`, {id: id}).then(() => {
        this.updateTable(name)
      })
    },
    postmodal (name) {
      if (this.modalloading) return
      this.modalloading = true
      let data = new FormData()
      Object.keys(this.modal[name].value).forEach(key => {
        if (typeof this.modal[name].value[key] === 'object' && key !== 'image') data.append(key, JSON.stringify(this.modal[name].value[key]))
        else { data.append(key, this.modal[name].value[key]) }
      })
      HTTP.post(`${name}/${(this.creatingmodal) ? 'create' : 'update'}`, data, { headers: {'Content-Type': 'multipart/form-data'} }).then(() => {
        this.updateTable(name)
        this.$bvModal.hide(name)
        this.modalloading = false
      })
    },
    searchoption (search, option) {
      if (this.modal[option.name].options[option.options][0].new) this.modal[option.name].options[option.options].shift()
      this.modal[option.name].options[option.options].unshift({label: search, new: true})
    },
    getoption () {
      HTTP.get('book/create').then(res => {
        this.modal.book.options = res.data
      })
    },
    updateTable (name) {
      this.data = {}
      this.loading = true
      HTTP.get(`${name}/gets`, {
        params: { page: this.page, perpage: this.perPage }
      }).then(res => {
        this.loading = false
        this.data = res.data
      })
    },
    updateNavigation (page, name) {
      this.loading = true
      HTTP.get(`${name}/gets`, {
        params: { page: page, perpage: this.perPage }
      }).then(res => {
        this.loading = false
        this.data = res.data
      })
    },
    onChangeTab (newTabIndex) {
      if (newTabIndex === 0) {
        this.loading = true
        this.perPage = 10
        this.data.list = this.fields = []
        HTTP.get('book/gets', { params: { page: 1 } }).then(res => {
          this.loading = false
          this.data = res.data
          this.fields = [
            {
              key: 'id',
              label: 'Артикул'
            },
            {
              key: 'name',
              label: 'Название'
            },
            {
              key: 'cost',
              label: 'Стоимость'
            },
            {
              key: 'author',
              label: 'Автор'
            },
            {
              key: 'actions',
              label: 'Действия'
            }
          ]
        })
      }
      if (newTabIndex === 1) {
        this.loading = true
        this.perPage = 10
        this.data.list = this.fields = []
        HTTP.get('author/gets', { params: { page: 1 } }).then(res => {
          this.loading = false
          this.data = res.data
          this.fields = [
            {
              key: 'id',
              label: 'ID'
            },
            {
              key: 'firstName',
              label: 'Имя'
            },
            {
              key: 'lastName',
              label: 'Фамилия'
            },
            {
              key: 'otchestvo',
              label: 'Отчество'
            },
            {
              key: 'actions',
              label: 'Действия'
            }
          ]
        })
      }
    }
  },
  created () {
    HTTP.get('book/gets', { params: { page: this.currentPage } }).then(res => {
      this.loading = false
      this.data = res.data
    })
  }
}
</script>
