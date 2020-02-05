<template>
  <component
    :is="component"
    :academic="academic"
    :isEdit="isEdit"
    :academics="data.data"
    @add="add"
    @edit="edit"
    @save="save"
    @back="back"
    @prev="prev"
    @submit="submit"
    @rearranged="rearranged"
  />
</template>

<script>
import Form from "./../../components/education/Form";
import History from "./../../components/education/History";

export default {
  props: ["resume"],

  data() {
    return {
      component: History,
      academic: {},
      isEdit: false,
      data: {
        meta: "education",
        data: []
      }
    };
  },

  created() {
    if (this.resume.length > 0) {
      let index = this.resume.findIndex(
        section => section.meta === "education"
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
        let index = this.data.data.findIndex(_data => _data === this.academic);
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
    edit(academic) {
      this.isEdit = true;
      this.academic = academic;
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

p {
  color: $secondaryDark;
}

label {
  font-weight: bold;
  font-size: 13px;
}

.btn-block {
  border: 1px dashed;
}
</style>
