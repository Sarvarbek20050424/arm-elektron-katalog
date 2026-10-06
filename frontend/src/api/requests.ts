import api from './client';
import { BookListResponse, BookDetail, Section, FilterOptions } from './types';

export const booksApi = {
  getList: async (params: Record<string, any>) => {
    const response = await api.get<BookListResponse>('/books', { params });
    return response.data;
  },
  getDetail: async (id: string) => {
    const response = await api.get<BookDetail>(`/books/${id}`);
    return response.data;
  },
};

export const sectionsApi = {
  getList: async () => {
    const response = await api.get<Section[]>('/sections');
    return response.data;
  },
};

export const filtersApi = {
  getList: async () => {
    const response = await api.get<FilterOptions>('/filters');
    return response.data;
  },
};
