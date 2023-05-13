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
  skills: [];
}