<template>
  <div class="add-packaging">
    <h2>Типы упаковок</h2>
    <div class="packaging__list">
      <div v-for="(packaging, index) in packagings" :key="index" class="packaging__item">
        <span>{{ packaging.id }}</span>
        <input v-if="isActiveItem(packaging.id)" v-model="activeItemText" type="text" />
        <p
          v-else
          @click.stop="activeItemId = packaging.id; activeItemText = packaging.type"
        >{{ packaging.type }}</p>
        <button v-if="isActiveItem(packaging.id)" @click="save">Сохранить</button>
        <button
          v-if="isActiveItem(packaging.id)"
          @click="activeItemId = null; activeItemText = null"
        >Отмена</button>
        <button v-else @click="removePackaging(packaging)">Удалить</button>
      </div>
    </div>
    <form class="packaging__controls" @submit.prevent="addNewPackaging">
      <input
        v-model="type"
        type="text"
        required
        placeholder="Новый тип упаковки"
        class="packaging__add"
      />
      <button>Добавить</button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "admin-packaging",
  data() {
    return {
      type: "",
      activeItemText: null,
      activeItemId: null
    };
  },
  methods: {
    addNewPackaging() {
      if (!this.type || this.type.length < 2) {
        return;
      }
      this.addNew(this.type);
      this.type = "";
    },
    save() {
      this.updatePackaging({ id: this.activeItemId, type: this.activeItemText });
      this.activeItemId = null;
      this.activeItemText = null;
    },
    isActiveItem(id) {
      return this.activeItemId === id;
    },
    ...mapActions('packagings', ['addNew', 'removePackaging', 'updatePackaging'])
  },
  computed: {
    ...mapState('packagings', ['packagings'])
  }
};
</script>
<style lang="less" scoped>
.add-packaging {
  h2 {
    margin-bottom: 20px;
  }
}
.packaging {
  &__list {
    width: 300px;
    margin-bottom: 20px;
    div {
      p {
        flex-grow: 1;
      }
      button {
        padding: 2px 10px;
        cursor: pointer;
        background: none;
        margin: 4px;
      }
    }
  }
  &__item {
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
      border: 1px solid #000;
    }
    span {
      margin-right: 10px;
    }
  }
  &__controls {
    input {
      font-size: 14px;
      outline: none;
      padding: 2px;
    }
    button {
      padding: 2px 10px;
      cursor: pointer;
      background: none;
      margin: 4px;
      font-size: 14px;
    }
  }
}
</style>
