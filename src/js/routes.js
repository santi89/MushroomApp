import ProjectView from "../pages/projects/projectView.vue";
import AboutPage from "../pages/about.vue";
import FormPage from "../pages/form.vue";
import LogIn from "../pages/auth/login.vue";
import SignUp from "../pages/auth/signup.vue";
import Profile from "../pages/auth/profile.vue";
import AddProject from "../pages/projects/addProject.vue";
import Devicelist from "../pages/device/devicelist.vue";
import Notificate from "../pages/device/notifications.vue";
import HumidityAndTemperature from "../pages/device/humidityAndtemperature.vue";
import SettingTemperature from "../pages/device/settingTemperature.vue";
import DynamicRoutePage from "../pages/dynamic-route.vue";
import RequestAndLoad from "../pages/request-and-load.vue";
import NotFoundPage from "../pages/404.vue";
import Report from "../pages/device/report.vue";
import SettingHumidity from "../pages/device/settingHumidity.vue";
import Devicedata from "../pages/device/devicedata.vue";
 import Test from "../pages/chart.vue";

var routes = [
  {
    path: "/projectView/",
    component: ProjectView,
    name: "ProjectView",
    props: true,
  },
  {
    path: "/devicedata/:sub_id/",
    component: Devicedata,
    name: "Devicedata",
    props: true,
  },
  {
    path: "/notificate/",
    component: Notificate,
  },
  {
    path: "/about/",
    component: AboutPage,
  },
  {
    path: "/test/",
    component: Test,
  },
  {
    path: "/settingHumidity/:action_id/:time/:stt_work/",
    component: SettingHumidity,
    props: true,
  },
  {
    path: "/settingTemperature/:action_id/:sub_id/:time/:stt_work/:gpio_name/",
    component: SettingTemperature,
    props: true,
  },
  {
    path: "/report/",
    component: Report,
  },
  {
    path: "/login/",
    component: LogIn,
  },
  {
    path: "/profile/",
    component: Profile,
  },
  {
    path: "/humidityAndtemperature/:sub_id/:head_name/",
    component: HumidityAndTemperature,
    props: true,
  },
  {
    path: "/addproject/",
    component: AddProject,
  },

  {
    path: "/devicelist/:pro_id/",
    component: Devicelist,
    props: true,
  },
  {
    path: "/signup/",
    component: SignUp,
  },
  {
    path: "/form/",
    component: FormPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
