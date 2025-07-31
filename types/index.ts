export interface Template {
  id: string;
  type: 'cv' | 'cover_letter' | 'portfolio';
  name: string;
  content: any;
}

export interface Generation {
  id: string;
  user_id: string;
  document_type: 'cv' | 'cover_letter' | 'portfolio';
  template_id: string;
  content: any;
  generated_at: string;
  expires_at?: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  github_repo: string;
  created_at: string;
  expires_at: string;
  payment_status: 'free_trial' | 'paid';
}

export interface UsageLimit {
  id: string;
  user_id: string;
  document_type: 'cv' | 'cover_letter' | 'portfolio';
  attempts: number;
  last_reset: string;
}
