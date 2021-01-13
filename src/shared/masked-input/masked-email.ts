export const emailMask = [
    {
        regexp: /^[\w\-_.]+$/,
        placeholder: 'Email',
    },
    { fixed: '@' },
    {
        regexp: /^[\w]+$/,
        placeholder: 'gmail',
    },
    { fixed: '.' },
    {
        regexp: /^[\w]+$/,
        placeholder: 'com',
    },
];