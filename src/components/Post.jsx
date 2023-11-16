import React from "react";

export function Post({ displayName, username, verified, text }) {
    return (
        <>
            <div className="card">
                <div className="img-circle">
                </div>
                <div className="card-body">
                    <div className="post__header">
                        <div className="post__headerText">
                            <h3>
                                {displayName}{" "}
                                <span className="post__headerSpecial">
                                    {verified} @{username}
                                </span>
                            </h3>
                        </div>
                        <div className="post__headerDescription">
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}