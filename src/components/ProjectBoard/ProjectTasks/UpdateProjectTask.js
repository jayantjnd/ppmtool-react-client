import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);

    const { projectIdentifier } = this.props.match.params;
    const { projectSequence } = this.props.match.params;

    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "0",
      dueDate: "",
      projectIdentifier: projectIdentifier,
      projectSequence: projectSequence,
      created_At: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(props) {
    const { projectIdentifier } = this.props.match.params;
    const { projectSequence } = this.props.match.params;

    this.props.getProjectTask(
      projectIdentifier,
      projectSequence,
      this.props.history
    );
  }

  componentWillReceiveProps(nextProps) {
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      id,
      created_At,
    } = nextProps.project_task;

    const { errors } = nextProps;

    this.setState({
      id: id,
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
      created_At: created_At,
      errors: errors,
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const taskToBeUpdated = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      projectIdentifier: this.state.projectIdentifier,
      projectSequence: this.state.projectSequence,
    };

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      taskToBeUpdated,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.projectIdentifier} | Project Task ID:{" "}
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    value={this.state.summary}
                    placeholder="Project Task summary"
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">
                      {errors.summary}. Reverted to old value.
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
