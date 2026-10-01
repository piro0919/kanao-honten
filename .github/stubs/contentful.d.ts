// CI 専用のスタブ。本物は `npm run contentful-typescript-codegen` が
// Contentful の Management API からリポジトリ直下の contentful.d.ts に生成する
// （トークンが要る）。CI には Secrets を置いていないので、lint と型検査の
// 前にこのファイルを同じ場所へ複写して代わりに使う。
// フィールドはコードが読んでいるものだけを書いている。Contentful 側で
// コンテンツモデルを変えたら、ここも合わせる。

declare namespace Contentful {
  type Asset = import("contentful").Asset;

  export interface ICalendarFields {
    date: string;
    isHoliday: boolean;
  }

  export interface IFishFields {
    description: string;
    isLive: boolean;
    name: string;
    thumbnail?: Asset;
  }

  export interface IServiceFields {
    background: Asset;
    description0?: string;
    description1?: string;
    description2?: string;
    description3?: string;
    description4?: string;
    order?: number;
    title: string;
  }

  export interface ISetouchiFishFields {
    description?: string;
    name: string;
    seasonEnd0: number;
    seasonEnd1?: number;
    seasonStart0: number;
    seasonStart1?: number;
    thumbnail?: Asset;
  }

  export interface ITopFields {
    description: string;
    order?: number;
    thumbnail: Asset;
    title: string;
  }

  export type CONTENT_TYPE =
    | "calendar"
    | "fish"
    | "service"
    | "setouchiFish"
    | "top";
}
