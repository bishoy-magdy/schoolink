/* eslint-env browser */

// markdown render
const render = () => {
    const md = window.markdownit({
        html: true,
    })
        .use(window.markdownitEmoji)
        .use(window.texmath, {
            engine: window.katex,
            delimiters: ['dollars', 'kramdown', 'doxygen', 'beg_end'],
            katexOptions: {
                macros: {
                    '\\RR': '\\mathbb{R}',
                },
            },
        });
    const { value } = document.getElementById('text_area');
    const result = md.render(value);
    const htmlResult = document.getElementById('html_result');
    htmlResult.innerHTML = result;
};

const textArea = document.getElementById('text_area');
textArea.ondrop = async (e) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    const dataBody = new FormData();

    // one file per drop
    const file = files[0];

    if (!file) { return; }

    dataBody.append('attachment', file);

    const response = await fetch('/create/attachment', {
        method: 'post',
        body: dataBody,
    });

    const body = await response.json();
    const {
        fileInfo,
    } = body;

    let fileLink = '';

    const {
        mimetype,
        filePath,
    } = fileInfo;

    if (mimetype.startsWith('video')) {
        fileLink = `<video controls style="width:100%; height:100%;"> <source src="${filePath}" type="video/mp4"></video>`;
    } else if (mimetype.startsWith('image')) {
        fileLink = `<img src="${filePath}"  style= "max-width:100%; max-height:100%;">`;
    } else if (mimetype.startsWith('application/pdf')) {
        fileLink = `<iframe src="${filePath}" style= "width:100%; height:100%;"></iframe>`;
    } else {
        fileLink = `<a href="${filePath}" download> download </a>`;
    }

    document.getElementById('text_area').value += fileLink;
    render();
};

const writeElement = document.getElementById('write');

writeElement.addEventListener('click', () => {
    const htmlContainer = document.getElementById('html_container');
    const markdownContainer = document.getElementById('markdown_container');

    htmlContainer.hidden = true;
    markdownContainer.hidden = false;
});

const previewElement = document.getElementById('preview');
previewElement.addEventListener('click', () => {
    const md = window.markdownit({
        html: true,
    })
        .use(window.markdownitEmoji)
        .use(window.texmath, {
            engine: window.katex,
            delimiters: ['dollars', 'kramdown', 'doxygen', 'beg_end'],
            katexOptions: {
                macros: {
                    '\\RR': '\\mathbb{R}',
                },
            },
        });

    const { value } = document.getElementById('text_area');
    const markdownContainer = document.getElementById('markdown_container');
    const htmlContainer = document.getElementById('html_container');
    const htmlResult = document.getElementById('html_result');
    const result = md.render(value);

    markdownContainer.hidden = true;
    htmlContainer.hidden = false;
    htmlResult.innerHTML = result;
});
