import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  constructor() {
    super();

    this.state = {
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    const { projectIdentifier } = this.props.match.params;

    this.props.getBacklog(projectIdentifier);
  }

  render() {
    const { projectIdentifier } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.state;

    let boardContent;

    const boardAlgorithm = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else if (errors.projectTaskSequence) {
          return (
            <div className="alert alert-info text-center" roel="alert">
              {errors.projectTaskSequence}
            </div>
          );
        }
      } else {
        return (
          <Backlog
            project_tasks_props={project_tasks}
            projectIdentifier={projectIdentifier}
          />
        );
      }
    };

    boardContent = boardAlgorithm(errors, project_tasks);

    return (
      <div className="container">
        <Link
          to={`/addProjectTask/${projectIdentifier}`}
          className="btn btn-primary mb-3"
        >
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
