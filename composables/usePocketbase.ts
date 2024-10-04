import { ref } from "vue";
import PocketBase from "pocketbase";

export function usePocketbase() {
  const config = useRuntimeConfig();
  const pocketbaseUrl = config.public.pocketbaseUrl as string;

  if (!pocketbaseUrl) {
    console.error("POCKETBASE_URL is not defined in the environment variables");
  }

  const pb = new PocketBase(pocketbaseUrl);

  //Auth
  const currentUser = ref(pb.authStore.model);

  pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.value = pb.authStore.model;
  });

  const logout = () => {
    pb.authStore.clear();
  };

  // Studylink

  const getAllStudylink = async () => {
    try {
      const records = await pb.collection("studylink").getFullList();
      return records;
    } catch (error) {
      console.error("Error fetching all studylink:", error);
      throw error;
    }
  };

  const getStudylinkBySlug = async (slug: string) => {
    try {
      const record = await pb
        .collection("studylink")
        .getFirstListItem(`slug="${slug}"`);
      return record;
    } catch (error) {
      console.error("Error fetching studylink:", error);
      throw error;
    }
  };
  const searchStudylinkByKeyword = async (query: string) => {
    try {
      const records = await pb.collection("studylink").getList(1, 50, {
        fields: "name,slug,description,process,keywords",
        filter: `(keywords ~ "${query}") || (name ~ "${query}") || (description ~ "${query}")`,
      });
      return records;
    } catch (error) {
      console.error("Error searching studylink:", error);
      throw error;
    }
  };

  //procedures
  const getAllProcedures = async () => {
    try {
      const records = await pb.collection("procedures").getFullList();
      return records;
    } catch (error) {
      console.error("Error fetching all procedures:", error);
      throw error;
    }
  };

  const getProcedureBySlug = async (slug: string) => {
    try {
      const record = await pb.collection("procedures").getFirstListItem(`slug="${slug}"`);
      return record;
    } catch (error) {
      console.error("Error fetching procedure:", error);
      throw error;
    }
  };

  // others
  const getImageUrl = (item: any) => {
    if (item && item.image) {
      return pb.files.getUrl(item, item.image, { thumb: "800x0" });
    }
    return "";
  };

  return {
    pb,
    currentUser,
    logout,
    getAllStudylink,
    getStudylinkBySlug,
    getImageUrl,
    searchStudylinkByKeyword,
    getAllProcedures,
    getProcedureBySlug,
  };
}
