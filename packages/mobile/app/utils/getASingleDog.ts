import { supabase } from "./supabaseClient";

const getASingleDog = async (id) => {
  const { data } = await supabase
    .from("dog")
    .select()
    .eq("id", id)
    .maybeSingle();

  return data;
};

export default getASingleDog;
