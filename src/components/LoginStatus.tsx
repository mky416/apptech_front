import React from 'react';

type LoginStatusProps = {
    loginstatus: number;
    login: () => void;
    logout: () => void;
}

function LoginStatus({
                     loginstatus,
                     login,
                     logout
                 }: LoginStatusProps) {
    return (
        <div>
            <h1>{loginstatus}</h1>
            <button onClick={login}>login</button>
            <button onClick={logout}>logout</button>
        </div>
    );
}

export default LoginStatus;