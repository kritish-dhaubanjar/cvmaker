<template>
  <div id="dashboard" class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-9">
          <h2>
            Welcome to
            <span>Document Home</span>
          </h2>
        </div>
        <div class="col-12 col-sm-3">
          <router-link
            tag="button"
            :to="{ name: 'resume' }"
            class="btn new btn-primary"
            exact
          >CREATE NEW</router-link>
        </div>
      </div>
      <hr class="my-4" />

      <div class="input-group my-5">
        <input type="text" class="form-control" placeholder="John Doe" v-model="search" />
        <div class="input-group-append">
          <button class="btn btn-outline-info" type="button">Search</button>
        </div>
      </div>

      <div class="d-none d-sm-block d-md-block">
        <div class="row">
          <div class="col-12 col-sm-4 col-md-3">
            <small class="font-weight-bold">My Documents:</small>
          </div>
          <div class="col-12 col-sm-3 col-md-3 col-lg-3">
            <small class="font-weight-bold">Type:</small>
          </div>
          <div class="col-12 col-sm-2 col-md-2 col-lg-2 d-sm-none d-md-block">
            <small class="font-weight-bold">Modified:</small>
          </div>
          <div class="col">
            <small class="font-weight-bold">Actions:</small>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card my-4 py-4 px-4 shadow-sm" v-for="client in filtered" :key="client.id">
            <div class="container-fluid p-0">
              <div class="row">
                <div class="col-12 col-sm-4 col-md-3">
                  <p class="mb-0 font-weight-bold">
                    <i class="far fa-user-circle"></i>
                    {{ client.name }}
                  </p>

                  <div class="smallDropdown dropdown d-block d-sm-none">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <router-link
                        :to="{
                          name: 'resumeEdit',
                          params: {
                            id: client.id
                          }
                        }"
                        class="dropdown-item"
                      >
                        <i class="far fa-edit"></i> Edit
                      </router-link>
                      <a class="dropdown-item" @click.prevent="download('pdf', client)">
                        <i class="far fa-file-pdf"></i> PDF
                      </a>
                      <a class="dropdown-item" @click.prevent="download('word', client)">
                        <i class="far fa-file-word"></i> DOCX
                      </a>
                      <a class="dropdown-item" href="#" @click.prevent="remove(client.id)">
                        <i class="fas fa-trash-alt"></i> Remove
                      </a>
                      <a class="dropdown-item" href="#" @click="upload(client.id)">
                        <i class="fas fa-cloud-upload-alt"></i> Upload
                      </a>
                    </div>
                  </div>

                  <small class="text-muted d-sm-block d-md-none">Modified: {{ client.updated_at }}</small>
                </div>
                <div class="col-6 col-sm-3 col-md-3 col-lg-3">
                  <span
                    class="badge badge-pill badge-success"
                    v-for="category in client.categories"
                    :key="category"
                  >{{ category }}</span>
                </div>
                <div class="col-12 d-none d-sm-none d-md-block col-md-2 col-lg-2">
                  <p class="mb-0">{{ client.updated_at }}</p>
                </div>
                <div class="col">
                  <ul class="d-none d-sm-block d-md-block d-lg-block">
                    <li class="text-center">
                      <router-link
                        :to="{
                          name: 'resumeEdit',
                          params: {
                            id: client.id
                          }
                        }"
                      >
                        <i class="far fa-edit"></i>
                        <span class="d-sm-none d-md-none d-lg-block">Edit</span>
                      </router-link>
                    </li>
                    <li class="text-center">
                      <a href="#" @click.prevent="download('pdf', client)">
                        <i class="far fa-file-pdf"></i>
                        <span class="d-sm-none d-md-none d-lg-block">PDF</span>
                      </a>
                    </li>
                    <li class="text-center">
                      <a href="#" @click.prevent="download('word', client)">
                        <i class="far fa-file-word"></i>
                        <span class="d-sm-none d-md-none d-lg-block">DOCX</span>
                      </a>
                    </li>
                    <li class="text-center">
                      <a href="#" @click.prevent="remove(client.id)" class="danger">
                        <i class="fas fa-trash-alt"></i>
                        <span class="d-sm-none d-md-none d-lg-block">Remove</span>
                      </a>
                    </li>
                    <li class="text-center">
                      <a href="#" @click.prevent="upload(client.id)">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span class="d-sm-none d-md-none d-lg-block">Upload</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <nav>
            <ul class="pagination my-4">
              <li class="page-item" :class="links.prev == null ? 'disabled' : ''">
                <a class="page-link" @click="goto(links.prev)">Previous</a>
              </li>
              <li
                class="page-item"
                v-for="i in meta.last_page"
                :key="i"
                :class="i == meta.current_page ? 'active' : ''"
              >
                <a class="page-link" @click="goto(`${meta.path}?page=${i}`)">
                  {{
                  i
                  }}
                </a>
              </li>

              <li class="page-item" :class="links.next == null ? 'disabled' : ''">
                <a class="page-link" @click="goto(links.next)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade p-0"
        id="myModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div v-if="active.type=='word'">
                <div class="row">
                  <a
                    class="mr-1"
                    :href="
                    `${hostname}/cv/${active.id}/${active.type}?template=1`
                  "
                  >
                    <img src="./../assets/word.png" class="img-fluid" width="100px" />
                    <br />
                    <b>Minimo</b>
                  </a>
                </div>
              </div>
              <div v-else>
                <div class="row px-2">
                  <a
                    target="_blank"
                    :href="
                    `${hostname}/cv/${active.id}/${active.type}?template=1`
                    "
                    class="mr-1"
                  >
                    <img src="./../assets/pdf.png" class="img-fluid" width="100px" />
                    <br />
                    <b>Enfold</b>
                  </a>
                  <a
                    class="mr-1"
                    v-for="pdf in active.files"
                    :key="pdf.template"
                    target="_blank"
                    :href="
                    `${hostname}/client_pdfs/${pdf.pdf}`
                  "
                  >
                    <img src="./../assets/word.png" class="img-fluid" width="100px" />
                    <br />
                    <b>Minimo</b>
                  </a>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      search: "",
      clients: [],
      all: [],
      active: {
        id: null,
        type: "",
        files: []
      },
      links: {
        first: null,
        last: null,
        prev: null,
        next: null
      },
      meta: {
        current_page: 1,
        from: 1,
        last_page: 2,
        path: null,
        per_page: 15,
        to: 15,
        total: 30
      }
    };
  },
  computed: {
    filtered() {
      if (this.search.length > 0) {
        return this.all.filter(client => {
          let categories = "";
          if (client.categories != null)
            categories = client.categories.join(" ");
          return (
            client.name.toLowerCase().includes(this.search.toLowerCase()) ||
            categories.toLowerCase().includes(this.search.toLowerCase())
          );
        });
      } else {
        return this.clients;
      }
    }
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      fetch(`${this.hostname}/api/clients`)
        .then(res => res.json())
        .then(data => {
          this.clients = data.data;
          this.links = data.links;
          this.meta = data.meta;
        });

      fetch(`${this.hostname}/api/clients/all`)
        .then(res => res.json())
        .then(data => {
          this.all = data.data;
        });
    },
    edit() {
      this.$router.push("/resume");
    },

    download(type, { id, pdfs }) {
      this.active.id = id;
      this.active.type = type;
      this.active.files = pdfs;
      $("#myModal").modal("show");
    },

    remove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          fetch(`${this.hostname}/api/clients/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json"
            }
          })
            .then(res => res.json())
            .then(data => {
              if (data.msg == "success") {
                this.clients = this.clients.filter(client => {
                  return id != client.id;
                });
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            });
        }
      });
    },

    upload(id) {
      Swal.fire({
        title: "Select PDF",
        input: "file",

        inputAttributes: {
          accept: "application/pdf",
          "aria-label": "Upload PDF"
        }
      }).then(pdf => {
        if (pdf.value !== null && pdf.dismiss !== "backdrop") {
          let formData = new FormData();
          formData.append("template", 1);
          formData.append("userId", id);
          formData.append("pdf", pdf.value);
          fetch(`${this.hostname}/api/uploadpdf`, {
            method: "POST",
            body: formData
          })
            .then(res => res.json())
            .then(data => {
              if (data.msg == "success") {
                this.init();
                Swal.fire({
                  title: "PDF Uploaded Successfully",
                  icon: "success",
                  timerProgressBar: true
                });
              }
            });
        }
      });
    },

    goto(link) {
      fetch(link)
        .then(res => res.json())
        .then(data => {
          this.clients = data.data;
          this.meta = data.meta;
          this.links = data.links;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../colors.scss";

#dashboard {
  background-color: rgab(250, 250, 250, 0.5);
}

h2 span {
  font-size: 32px;
  color: $secondary;
}

@media screen and (min-width: 576px) {
  .new {
    float: right;
  }
}

p {
  font-size: 15px;
  color: $secondaryDark;
}

small {
  color: $primaryDark;
}

.badge {
  font-size: 12px;
  margin-right: 4px;
}

a {
  color: $primary;
  text-decoration: none;
  transition: 500ms;
  &:hover {
    transition: 500ms;
    color: $secondary;
  }
}

.card ul {
  list-style-type: none;
  margin-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  li {
    a {
      font-size: 16px;
    }
    display: inline-block;
    margin-right: 12px;
  }
}

.dropdown-toggle {
  background-color: #fff;
  border: none;
  &:active,
  &:focus,
  &:hover {
    background-color: #fff;
    border: none;
    box-shadow: none;
  }
  &::after {
    display: none;
  }
}

.dropdown-menu {
  a {
    color: $secondaryDark;
    padding-top: 6px;
    padding-bottom: 6px;
  }
}

.smallDropdown {
  float: right;
  .dropdown-menu {
    transform: translate3d(-125px, 33px, 0px);
  }
}

.active {
  border: none;
}

.danger {
  color: $secondary;
}
</style>
