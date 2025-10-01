export type MenuType = {
  id: string;
  title: string;
  url: string;
  order: number;
  parentId: string;
  children?: MenuType[];
};
