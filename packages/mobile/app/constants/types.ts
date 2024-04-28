import { Identifier } from "typescript";

export type Database = {
  age: string | null;
  breed: string | null;
  description: Array<string> | null;
  fence_height: string | null;
  good_with_cats: string | null;
  good_with_children: string | null;
  good_with_dogs: string | null;
  images: string[] | null;
  last_updated: string | null;
  location: string | null;
  name: string | null;
  rescue_name: string | null;
  reserved: string | null;
  sex: string | null;
  time_left: string | null;
  website_url: string | null;
  id: number;
};
