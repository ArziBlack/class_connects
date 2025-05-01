import { Class } from '../types';

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Mathematics 101',
    subject: 'Mathematics',
    tutor: 'Dr. Jane Smith',
    description: 'Introduction to basic mathematical concepts and principles.',
    color: '#3B82F6',
    coverImage: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    students: 24,
    nextClass: 'Today, 2:00 PM',
    code: 'math-101-abc'
  },
  {
    id: '2',
    name: 'Physics Advanced',
    subject: 'Physics',
    tutor: 'Prof. Robert Chen',
    description: 'Advanced physics concepts including quantum mechanics and relativity.',
    color: '#8B5CF6',
    coverImage: 'https://images.pexels.com/photos/2155241/pexels-photo-2155241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    students: 18,
    nextClass: 'Tomorrow, 10:00 AM',
    code: 'phys-adv-xyz'
  },
  {
    id: '3',
    name: 'Computer Science',
    subject: 'Computer Science',
    tutor: 'Dr. Alex Johnson',
    description: 'Introduction to algorithms, data structures, and programming fundamentals.',
    color: '#10B981',
    coverImage: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    students: 32,
    nextClass: 'Friday, 1:00 PM',
    code: 'cs-intro-123'
  },
  {
    id: '4',
    name: 'English Literature',
    subject: 'English',
    tutor: 'Prof. Emily Parker',
    description: 'Analysis of classic and contemporary literary works.',
    color: '#F59E0B',
    coverImage: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    students: 20,
    nextClass: 'Wednesday, 3:00 PM',
    code: 'eng-lit-456'
  }
];