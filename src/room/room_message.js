import React from 'react';

const RoomMessage = (props) => (
    <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
        <p><strong>{props.player}</strong> says:</p>
        <p>{props.data}</p>
    </div>
);

export default RoomMessage;