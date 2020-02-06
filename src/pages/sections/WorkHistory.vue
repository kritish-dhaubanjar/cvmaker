<template>
  <component
    :is="component"
    :work="work"
    :isEdit="isEdit"
    :works="data.data"
    @add="add"
    @edit="edit"
    @save="save"
    @back="back"
    @prev="prev"
    @submit="submit"
    @rearranged="rearranged"
    @saveresume="$emit('saveresume', data)"
  />
</template>

<script>
import Form from "./../../components/workHistory/Form";
import History from "./../../components/workHistory/History";

export default {
  props: ["resume"],

  data() {
    return {
      component: History,
      work: {},
      isEdit: false,
      data: {
        meta: "workHistory",
        data: []
      }
    };
  },

  created() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "workHistory"
      );
      if (index > -1) {
        this.data = this.resume[index];
      }
    }
  },

  methods: {
    rearranged(data) {
      this.data.data = data;
    },
    save(data) {
      if (this.isEdit) {
        let index = this.data.data.findIndex(_data => _data === this.work);
        this.data.data[index] = data;
        this.isEdit = false;
      } else {
        this.data.data.push(data);
      }
      this.component = History;
    },
    back() {
      this.component = History;
    },
    add() {
      this.component = Form;
    },
    edit(work) {
      this.isEdit = true;
      this.work = work;
      this.component = Form;
    },
    submit(data) {
      this.$emit("next", this.data);
    },
    prev() {
      this.$emit("prev");
    }
  },

  components: {
    Form,
    History
  }
};
</script>

<style scoped lang="scss">
@import "./../../colors.scss";
h3,
h5,
a {
  color: $primary;
  font-weight: normal;
}
</style>
