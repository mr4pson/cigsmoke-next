import { navigateTo } from "common/helpers";
import { NextRouter } from "next/router";
import { signout } from "redux/slicers/authSlicer";
import { AppDispatch } from "redux/store";
import { Page, paths } from "routes/constants";
import { TMenuItem } from "./types";

export const currentPath = (router: NextRouter) => {
  if (router.pathname === paths[Page.CATEGORIES]) {
    return 'Категории';
  }
  if (router.pathname === paths[Page.PRODCUCTS]) {
    return 'Продукты';
  }
  if (router.pathname === paths[Page.CREATE_CATEGORY]) {
    return 'Создание новой категории';
  }
  if (router.pathname === paths[Page.EDIT_CATEGORY]) {
    return 'Редактирование категории';
  }
};

export const handleSelect = (router: NextRouter) => (route: any) => {
  router.push(route.key);
};

export const getSelectedKeys = (pathname: string) => {
  const entry = Object.values(paths).find(
    (path) => path !== paths[Page.HOME] && pathname.includes(path),
  );
  return entry ? [entry] : [];
};

export const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: TMenuItem[],
): TMenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as TMenuItem;
}

export const handleLogout = (router: NextRouter, dispatch: AppDispatch) => async () => {
  await dispatch(signout());
  navigateTo(router, Page.LOGIN)();
}
