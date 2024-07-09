import { RouteNamesEnum } from "localConstants";
import { Unlock, Home, Disclaimer } from "pages";
import { RouteType } from "types";

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: "Home",
    component: Home,
  },
  {
    path: RouteNamesEnum.unlock,
    title: "Unlock",
    component: Unlock,
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: "Disclaimer",
    component: Disclaimer,
  },
];
