import {call, takeLatest, delay, select, put} from "redux-saga/effects";
import {projectService} from "../../../services/ProjectService";
import {STATUS_CODE} from "../../../util/constant/system";
import {notifiFuncion} from "../../../util/notification/notification";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  DISPLAY_LOADING,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  HIDE_LOADING,
} from "../../constant/BugtifyConstant";

//fetch project list
function* getAllProjectSaga(action) {
  try {
    yield put({
      type: DISPLAY_LOADING,
    });
    yield delay(100);
    const {data, status} = yield call(() => {
      return projectService.getAllProject();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });
    }
    console.log(data);
    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* monitorGetAllProjectsSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}

//assign user for project and reload

function* assignUserProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.assignUserProject(action.assignUser);
    });
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      notifiFuncion("success", "Successfully Assign User for Project");
    }
  } catch (err) {
    notifiFuncion("error", "Fail to Assign this User ");
  }
}

export function* monitorAssignUserProjectSaga() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProjectSaga);
}

//delete Project and reload
function* deleteProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.deleteProject(action.projectId);
    });
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      notifiFuncion("success", "Successfully Delete Project");
    }
  } catch (err) {
    notifiFuncion("error", "Fail to Delete Project ");
  }
}

export function* monitorDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//Create Projet
function* createProjectSaga(action) {
  try {
    const {data, status} = yield call(() => {
      return projectService.createProject(action.project);
    });
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      notifiFuncion("success", "Successfully Create Project");
    }
  } catch (err) {
    notifiFuncion("error", `${err.response.data.content}`);
  }
}

export function* monitorCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}