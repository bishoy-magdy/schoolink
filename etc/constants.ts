/* eslint-disable import/prefer-default-export */
export enum AuthLevel {
    STRICT,
    LENIENT,
}

export const allowedJSPaths = [
    '\'self\'',
    'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/markdown-it-emoji/0.1.1/markdown-it-emoji.min.js',
    'https://cdn.jsdelivr.net/npm/katex/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/markdown-it-texmath/texmath.min.js',
];
