import * as React from 'react';


export default function NText(props) {
    const { tColor, tFont, tFontSize, TText } = props;
    const style = {
        color: tColor || '#6A41AE',
        fontFamily: tFont || 'Poppins',
        fontSize: tFontSize || '100%' };
    return (
        <p style={style}>{TText || "An online platform facilitating childcare and nursing services, connecting families with qualified caregivers and healthcare professionals. "}</p>
    );
}