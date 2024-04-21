import { supabase } from "./supabaseClient";

const getASingleDog = async (name) => {
  const { data } = await supabase
    .from("dog")
    .select()
    .eq("name", name)
    .maybeSingle();

  return data;
};

export default getASingleDog;
