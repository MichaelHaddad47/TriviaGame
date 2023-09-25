// BlurredBackdrop.tsx

import React from 'react';

interface Props {
    show: boolean;
}

const BlurredBackdrop: React.FC<Props> = ({ show }) => {
    if (!show) return null;

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backdropFilter: 'blur(5px)',
            zIndex: 1
        }}></div>
    );
}

export default BlurredBackdrop;
