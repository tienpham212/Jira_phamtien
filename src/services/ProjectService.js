import React from "react";
import {baseService} from "./BaseServices";

class ProjectServices extends baseService {
  constructor() {
    super();
  }
  getAllProject = () => {
    return this.get(`Project/getAllProject`);
  };
  assignUserProject = (userAssign) => {
    return this.post(`Project/assignUserProject`, userAssign);
  };
  deleteProject = (projectId) => {
    return this.delete(`Project/deleteProject?projectId=${projectId}`);
  };
  createProject = (project) => {
    return this.post(`Project/createProjectAuthorize`, project);
  };
  deleteUserProject = (project) => {
    return this.post(`Project/removeUserFromProject`, project);
  };
  updateProject = (project) => {
    return this.put(`Project/updateProject?projectId=${project.id}`, project);
  };
}

export const projectService = new ProjectServices();
