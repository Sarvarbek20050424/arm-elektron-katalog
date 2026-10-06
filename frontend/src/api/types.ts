export interface Reader {
  id: string;
  full_name: string;
  hemis_id: string;
  faculty?: string;
  course?: string;
  group?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  reader: Reader;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export interface Section {
  id: string;
  name: string;
  books_count: number;
  children: Section[];
}

export interface Copy {
  barcode: string;
  inventory_number: string;
  section: string;
  status: 'available' | 'borrowed' | 'unavailable';
  due_at: string | null;
}

export interface BookSummary {
  id: string;
  title: string;
  author: string;
  year: number;
  language: string;
  type: string;
  cover_url: string | null;
  section: {
    id: string;
    name: string;
    path: string[];
  };
  status: 'available' | 'borrowed' | 'unavailable';
  copies_total: number;
  copies_available: number;
}

export interface BookDetail {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  city?: string;
  year: number;
  pages?: string;
  language: string;
  type: string;
  isbn?: string;
  udk?: string;
  kbk?: string;
  annotation?: string;
  editor?: string;
  translator?: string;
  cover_url?: string | null;
  section: {
    id: string;
    name: string;
    path: string[];
  };
  status: 'available' | 'borrowed' | 'unavailable';
  copies_total: number;
  copies_available: number;
  nearest_due_at?: string | null;
  copies: Copy[];
}

export interface BookListResponse {
  items: BookSummary[];
  total: number;
  page: number;
  page_size: number;
}

export interface FilterOptions {
  languages: string[];
  types: string[];
}

export interface Loan {
  book: {
    id: string;
    title: string;
    author: string;
    cover_url: string | null;
  };
  taken_at: string;
  due_at: string;
  returned_at: string | null;
  overdue: boolean;
}

export interface LoanListResponse {
  items: Loan[];
}
