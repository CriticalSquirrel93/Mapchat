import React from "react";

export function Post({ displayName, username, verified, text, likes }) {



    return (
        <>
            <div className="card text-left mb-3 shadow">
                <div className="img-circle">
                </div>
                <div className="card-header">
                    <div className="card-title">
                        <span className="card-text">@{displayName}</span>
                    </div>
                    <p>{username}</p>
                    <div className="card-subtitle">
                        <span className="card-text">{verified}</span>
                    </div>
                </div>
                <div className="card-body">
                        <div className="card-text text-left">
                            <p className="text-left">{text}</p>
                        </div>
                </div>
                <div className="card-footer">
                    <div className="btn card-link px-3">Reply</div>
                    <div className="btn card-link px-3">Repost</div>
                    <div className="btn card-link px-3">Like {likes ? (likes) : null }</div>
                    <div className="btn card-link px-3">Share</div>
                </div>
            </div>
        </>
    )
}