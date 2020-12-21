import React from 'react';


const LimitedTextarea = ({ value, limit }) => {
    const [content, setContent] = React.useState(value.slice(0, limit));

    const setFormattedContent = React.useCallback(
        text => {
            setContent(text.slice(0, limit));
        },
        [limit, setContent]
    );

    return (
        <>
            <textarea

                onChange={event => setFormattedContent(event.target.value)}
                value={content}
            />
            <p>
                {content.length}/{limit}
            </p>
        </>
    );
};

export default LimitedTextarea;

