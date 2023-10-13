import React from 'react'

import "./postCard.css";

export default function PostCard({ data }) {
    return (
        <div className='card'>
            <div className="text">{data.title}:
            <span className="text">{data.body}</span>
            </div>
            
            <div className='tags'>{data.tags.map(tag => (
                <span className="tag" key={tag}>{tag}</span>
            ))}</div>
        </div>
    );
}
