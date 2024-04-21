import { supabase } from "./supabaseClient";

const getDetails = async () => {
  const { data } = await supabase.from("dog").select();

  return data;
};

export default getDetails;
