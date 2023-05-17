export interface Portfolio {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  projects: Project[];
}
export interface Project {
  id: number;
  isDraft: boolean;
  portfolioId: number;
  clientName: string;
  clientDescription: string;
  clientIndustry: string;
  projectName: string;
  projectDescription: string;
  size: string;
  startDate: string;
  endDate: string;
  cloud: string;
  actions: string;
  outcome: string;
  createdAt: string;
  updatedAt: string;
  skills: ISkills[];
  teamSize: string;
  role: string,
  projectType: string
}

export interface ValidationErrors {
  portfolioId?: string;
  clientName?: string;
  clientDescription?: string;
  clientIndustry?: string;
  projectName?: string;
  projectDescription?: string;
  size?: string;
  startDate?: string;
  endDate?: string;
  cloud?: string;
  actions?: string;
  outcome?: string;
  teamSize?: string;
  role?: string;
  projectType?: string;
}

export interface ISkills {
  id?: number;
  projectId?: number;
  type: string;
  value: string;
}
