import type { AxiosResponse } from 'axios';

export default function useNotes() {
  const { $api } = useNuxtApp();


  const getExistingNotes = async (): Promise<AxiosResponse<Note[]>> => {
    const response = await $api.get('/notes');
    return response;
  };

  return {
    getExistingNotes
  };
}
