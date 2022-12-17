import { DocumentData, getDocs, Query } from "firebase/firestore";

const useGetQueryData = <T extends {}>(query: Query<DocumentData>) => {
  const getPostQueryData = async () => {
    const queryDocs = await getDocs(query);
    const queryData = queryDocs.docs.map((doc) => {
      return {
        ...(doc.data() as T),
        id: doc.id,
      };
    });
    return queryData;
  };

  const result = getPostQueryData();

  return result;
};

export default useGetQueryData;
