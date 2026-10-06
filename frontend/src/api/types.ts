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

export interface BookListResponse {
  items: BookSummary[];
  total: number;
  page: number;
  page_size: number;
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
