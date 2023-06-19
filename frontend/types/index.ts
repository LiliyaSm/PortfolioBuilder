import type { NextPage } from 'next';
import type { ReactElement, ReactNode } from 'react';
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
  role: string;
  projectType: string;
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
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface ISkills {
  id?: number;
  projectId?: number;
  type: string;
  value: string;
}

export interface IChartData {
  labels: string[];
  data: string[];
}
export interface IGeneralStatistics {
  users: number;
  portfolios: number;
  projects: number;
  happiness: string;
}
export interface ISkillsStatistics {
    languages: IChartData;
    frameworks: IChartData;
    tools: IChartData;
}

export interface IStatistics extends IGeneralStatistics {
  skills: ISkillsStatistics
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};