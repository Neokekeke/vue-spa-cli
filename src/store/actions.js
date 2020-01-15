import Api from "../../services/api";

export const getResult = ({ dispatch, commit, getters }, params) => {
    commit("GET_RESULT_REQUEST");
    console.log("getters", getters);

    return Api.TestKoa.getResult()
        .then(res => {
            commit("GET_RESULT_SUCCESS", res);
        })
        .catch(err => {
            commit("GET_RESULT_FAIL", res);
            console.log(err);
        });
};
