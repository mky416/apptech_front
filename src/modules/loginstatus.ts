const LOGIN = 'loginstatus/LOGIN' as const;
const LOGOUT = 'loginstatus/LOGOUT' as const;

// 액션 생성함수를 선언합니다
export const login = () => ({
    type: LOGIN
});

export const logout = () => ({
    type: LOGOUT
});


// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
type LoginStatusAction =
    | ReturnType<typeof login>
    | ReturnType<typeof logout>;

// 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
type LoginState = {
    loginStatus: number;
};

// 초기상태를 선언합니다.
const initialState: LoginState = {
    loginStatus: 0
};

// 리듀서를 작성합니다.
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function loginstatus(
    state: LoginState = initialState,
    action: LoginStatusAction
): LoginState {
    switch (action.type) {
        case LOGIN: 
            return { loginStatus: 1 };
        case LOGOUT:
            return { loginStatus: 0 };
        default:
            return state;
    }
}

export default loginstatus;