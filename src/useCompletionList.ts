import useSWR from "swr";

type ListResponse = string[];

async function fetcherList(url: string): Promise<ListResponse> {
  const res = await fetch(url);
  return res.json();
}

export const useCompletionList = (category: string) => {
  const { data, error, isLoading } = useSWR(
    `/lists?category=${encodeURIComponent(category)}`,
    fetcherList
  );
  return {
    data: data,
    listError: error,
    isListLoading: isLoading,
  };
};

type CategoryResponse = string[];

async function fetcherCategory(url: string): Promise<CategoryResponse> {
  const res = await fetch(url);
  return res.json();
}

export const useCategoryList = () => {
  const { data, error, isLoading } = useSWR(`/categories`, fetcherCategory);
  return {
    category: data,
    categoryError: error,
    isCategoryLoading: isLoading,
  };
};
