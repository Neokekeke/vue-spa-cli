export const mutations = {
    'GET_RESULT_REQUEST'(state, res) {},
    'GET_RESULT_SUCCESS'(state, res) {
        state.koaRes = res;
    },
    'GET_RESULT_FAIL'(state, res) {},
}