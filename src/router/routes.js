import Dashboard from "./../pages/Dashboard";
import Templates from "./../pages/Templates";
import Resume from "./../pages/Resume";

export const routes = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard"
  },
  {
    path: "/templates",
    component: Templates,
    name: "templates"
  },
  {
    path: "/resume",
    component: Resume,
    name: "resume"
  },
  {
    path: "/resume/:id",
    component: Resume,
    name: "resumeEdit",
    props: true
  }
];
