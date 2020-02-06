<template>
  <div class="container">
    <h3>Education Summary</h3>
    <br />

    <div class="row">
      <div class="col-12">
        <draggable v-model="history" @start="drag = true" @end="drag = false" v-bind="{delay: 200}">
          <div v-for="(academic, index) in history" :key="index">
            <!-- {{academic}} -->
            <card
              :academic="academic"
              :index="index"
              @remove="remove"
              @edit="$emit('edit', academic)"
            />
          </div>
        </draggable>
      </div>
    </div>
    <br />
    <div class="row mb-3">
      <div class="col-12">
        <button class="btn btn-success btn-block py-2" @click="$emit('add')">
          <b>
            <i class="fas fa-plus-circle"></i> ADD ANOTHER DEGREE
          </b>
        </button>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-12">
        <button class="btn btn-outline-primary btn-sm" type="submit" @click="$emit('prev')">BACK</button>
        <button
          class="btn btn-danger ml-auto btn-sm"
          type="submit"
          style="float:right"
          @click.prevent="$emit('submit', history)"
        >SAVE & NEXT: SKILLS</button>
        <button
          class="btn btn-info ml-auto mr-1 btn-sm"
          type="submit"
          style="float:right"
          @click.prevent="$emit('saveresume', history)"
        >
          <i class="far fa-save"></i> SAVE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Card from "./Card";
export default {
  props: ["academics"],

  data() {
    return {
      history: []
    };
  },

  watch: {
    history() {
      this.$emit("rearranged", this.history);
    }

    // academics: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.history = this.academics;
    //   }
    // }
  },

  mounted() {
    this.history = this.academics;
  },

  methods: {
    remove(index) {
      this.history.splice(index, 1);
    }
  },

  components: {
    draggable,
    Card
  }
};
</script>


<style scoped lang="scss">
@import "./../../colors.scss";
h3 {
  color: $primary;
}
.btn-block {
  border: 1px dashed;
}
</style>