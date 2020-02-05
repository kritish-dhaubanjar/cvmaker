<template>
  <div class="shadow-sm">
    <div class="container px-0">
      <nav class="navbar navbar-expand-sm navbar-light">
        <a class="navbar-brand my-1" href="#">Way to Success</a>
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="sm-dropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          >Account</a
        >
        <div id="sm-menu" class="dropdown-menu" aria-labelledby="sm-dropdown">
          <router-link :to="{ name: 'dashboard' }" class="dropdown-item"
            >Dashboard</router-link
          >
          <router-link :to="{ name: 'templates' }" class="dropdown-item" exact
            >Templates</router-link
          >
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" :href="`${hostname}/changepassword`"
            >Change Password</a
          >
          <form :action="`${hostname}/logout`" method="POST">
            <button class="dropdown-item" type="submit">
              Sign Out
            </button>
          </form>
        </div>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto ml-3">
            <li class="nav-item">
              <router-link
                :to="{ name: 'dashboard' }"
                class="nav-link"
                exact
                active-class="active"
                >Dashboard</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'templates' }"
                class="nav-link"
                exact
                active-class="active"
                >Templates</router-link
              >
            </li>
          </ul>
          <div class="my-0 my-lg-0">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  >Account</a
                >
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" :href="`${hostname}/changepassword`"
                    >Change Password</a
                  >
                  <form :action="`${hostname}/logout`" method="POST">
                    <button class="dropdown-item" type="submit">
                      Sign Out
                    </button>
                  </form>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./../colors.scss";

.dropdown-menu {
  border-radius: 0 !important;
}

a {
  color: $secondaryDark;
  font-weight: 500;
}

.dropdown-toggle {
  color: $secondaryDark;
  &:hover {
    color: $primary;
  }
}

.dropdown-item {
  color: $secondaryDark;
  &:active,
  &:focus {
    color: $primaryDark;
    background-color: #e3e3e3;
  }
}

.nav-link {
  padding-right: 0 !important;
  padding-left: 0 !important;
  margin-left: 0.85rem !important;
  margin-right: 0.5rem !important;
  color: $secondaryDark;
  transition: 500ms;
  &:hover {
    color: $primary !important;
    transition: 500ms;
  }
}

.active {
  color: $primaryDark !important;
  border-bottom: 4px solid $primary;
}

#sm-menu {
  right: 0 !important;
  left: unset;
  width: max-content;
}

#sm-dropdown {
  color: $secondaryDark;
  transition: 500ms;
  &:hover {
    color: $primary;
    transition: 500ms;
  }
}

@media screen and (min-width: 576px) {
  #sm-dropdown {
    display: none;
  }
}
</style>
