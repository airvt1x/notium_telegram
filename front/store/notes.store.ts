export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([]);
  const note = ref<Note>({} as Note);
  const favs = ref<Note[]>([]);
  const skeletonNote = ref<boolean>(false);
  const filterModel = ref<string>('');
  const isFilteredNotes = ref<boolean>(true);
  const defaultNote = ref<NoteData>({
    content: '<h1>Untitled</h1><p></p>',
    type: 'doc'
  });

  const {
    getExistingNotes,
  } = useNotes();

  const getNotes = async () => {
    try {
      skeletonNote.value = true;
      const response = await getExistingNotes();
      notes.value = response.data;
    } catch (err) {
      console.log(err);
    } finally {
      skeletonNote.value = false;
    }
  };
  const setSkeleton = () => {
    setTimeout(() => {
      skeletonNote.value = true;
    }, 1000);
  };
  const unsetSkeleton = () => {
    skeletonNote.value = false;
  };

  return {
    notes,
    note,
    favs,
    defaultNote,
    unsetSkeleton,
    skeletonNote,
    setSkeleton,
    getNotes,
    filterModel,
    isFilteredNotes
  };
});
