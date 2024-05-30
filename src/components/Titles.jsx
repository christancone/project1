import * as React from 'react';

export default function Titles(props) {
    const { tColor, tFont, tFontSize, TText } = props;
    const style = {
        color: tColor || '#6A41AE',
        fontFamily: tFont || 'Poppins',
        fontSize: tFontSize || '250%' };
    return (
        <h1 style={style}>{TText || 'Text'}</h1>
    );
}
