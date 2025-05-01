export interface Class {
  id: string;
  name: string;
  subject: string;
  tutor: string;
  description: string;
  color: string;
  coverImage?: string;
  students: number;
  nextClass: string;
  code: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor';
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  classId: string;
  status?: 'pending' | 'submitted' | 'graded';
  grade?: string;
}