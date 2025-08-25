// // lib/api.ts

// import axios from 'axios';
// import type { Note, NoteTag } from '../app/types/note';

// axios.defaults.baseURL = "https://notehub-public.goit.study/api";

// export interface FetchNotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export interface NewNote {
//   title: string;
//   content: string;
//   tag: NoteTag;
// }

// export interface CategoryType {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const getAuthHeader = () => {
//   const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
//   return { Authorization: `Bearer ${myKey}` };
// };

// // Отримати нотатки з можливістю фільтрувати за тегом
// export const fetchNotes = async (
//   page: number,
//   search: string,
//   tag?: string
// ): Promise<FetchNotesResponse> => {
//   const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

//   try {
//     const res = await axios.get<FetchNotesResponse>('/notes', {
//       params: {
//         page,
//         ...(search.trim() && { search: search.trim() }),
//         ...(tag && tag.toLowerCase() !== 'all' && { tag }),
//       },
//        headers: { Authorization: `Bearer ${myKey}` },
//     });

//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createNote = async (newNote: NewNote): Promise<Note> => {
//    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

//   try {
//     const res = await axios.post<Note>('/notes', newNote, {
//        headers: { Authorization: `Bearer ${myKey}` },
//     });
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteNote = async (noteId: string): Promise<Note> => {
//    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

//   try {
//     const res = await axios.delete<Note>(`/notes/${noteId}`, {
//         headers: { Authorization: `Bearer ${myKey}` },
//     });

//     return res.data;
//     } catch (error) {

//         throw error;
//     }    
// }

// // Отримати одну нотатку за id
// export const getSingleNote = async (id: string): Promise<Note> => {
//   const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
//    try {
//     const res = await axios.get<Note>(`/notes/${id}`, {
//         headers: { Authorization: `Bearer ${myKey}` },
//     });

//     return res.data;
//     } catch (error) {
    
//         throw error;
//     }
// }

// export const getCategories = async (): Promise<CategoryType[]> => {
//   try {
//     const res = await axios.get<CategoryType[]>('/categories', {
//       headers: getAuthHeader(),
//     });
//     return res.data;
//   } catch (error) {
//     console.error( error);
//     return []; // щоб фронт не падав
//   }
// };

// export type { Note, NoteTag };

// lib/api.ts
import axios from 'axios';
import type { Note, NoteTag } from '../app/types/note';

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CategoryType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const getAuthHeader = () => {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  return { Authorization: `Bearer ${myKey}` };
};

// Отримати нотатки з можливістю фільтрувати за тегом
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  try {
    const res = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        page,
        ...(search.trim() && { search: search.trim() }),
        ...(tag && tag.toLowerCase() !== 'all' && { tag }),
      },
      headers: { Authorization: `Bearer ${myKey}` },
    });

    return res.data;
  } catch (error) {
    console.error('fetchNotes error:', error);
    return { notes: [], totalPages: 0 }; // запобігаємо падінню білду
  }
};

export const createNote = async (newNote: NewNote): Promise<Note | null> => {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  try {
    const res = await axios.post<Note>('/notes', newNote, {
      headers: { Authorization: `Bearer ${myKey}` },
    });
    return res.data;
  } catch (error) {
    console.error('createNote error:', error);
    return null;
  }
};

export const deleteNote = async (noteId: string): Promise<Note | null> => {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  try {
    const res = await axios.delete<Note>(`/notes/${noteId}`, {
      headers: { Authorization: `Bearer ${myKey}` },
    });
    return res.data;
  } catch (error) {
    console.error('deleteNote error:', error);
    return null;
  }
};

// Отримати одну нотатку за id
export const getSingleNote = async (id: string): Promise<Note | null> => {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  try {
    const res = await axios.get<Note>(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${myKey}` },
    });
    return res.data;
  } catch (error) {
    console.error('getSingleNote error:', error);
    return null;
  }
};

// Отримати категорії
export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const res = await axios.get<CategoryType[]>('/categories', {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    console.error('getCategories error:', error);
    return []; // запобігаємо падінню фронту
  }
};

// Експортуємо типи
export type { Note, NoteTag };
