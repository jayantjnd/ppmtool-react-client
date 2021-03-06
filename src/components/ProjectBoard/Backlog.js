import React, { Component } from "react";
import ProjectTaskItem from "./ProjectTasks/ProjectTaskItem";

class Backlog extends Component {
  render() {
    const { project_tasks_props } = this.props;
    const { projectIdentifier } = this.props;

    const tasks = project_tasks_props.map((project_task) => (
      <ProjectTaskItem
        key={project_task.id}
        project_task={project_task}
        projectIdentifier={projectIdentifier}
      />
    ));

    let toDoItems = tasks.filter(
      (task) => task.props.project_task.status === "TO_DO"
    );

    let inProgressItems = tasks.filter(
      (task) => task.props.project_task.status === "IN_PROGRESS"
    );

    let doneItems = tasks.filter(
      (task) => task.props.project_task.status === "DONE"
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {toDoItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
