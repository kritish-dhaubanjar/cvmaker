<template>
  <div>
    <app-navbar />
    <router-view></router-view>
    <app-footer />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  components: {
    appNavbar: Navbar,
    appFooter: Footer
  }
};
</script>

<style lang="scss">
@import "colors.scss";
* {
  font-family: "Roboto", sans-serif;
  font-size: 15px;
}

.btn-primary {
  background-color: $primary;
}

.card {
  border-radius: 0;
}

@media screen and (max-width: 991px) {
  .container {
    margin: 0;
    max-width: 100%;
  }
}

.btn {
  border-radius: 0;
}

.custom-select,
.form-control {
  border-radius: 0;
  &:focus {
    box-shadow: none;
  }
}

.modal-content,
.modal-body {
  border-radius: 0 !important;
}

.addMore {
  font-weight: bold;
}
</style>
