/* eslint-env browser */

const postId = document.getElementById('post_id').value;

const md = window.markdownit({ html: true })
    .use(window.markdownitEmoji)
    .use(window.texmath, {
        engine: window.katex,
        delimiters: ['dollars', 'kramdown', 'doxygen', 'beg_end'],
    });

const renderPost = () => {
    const postContent = document.getElementById('post_raw').innerText;
    document.getElementById('post_body').innerHTML = md.render(postContent);
};

const getcomments = async () => {
    const response = await fetch(`/get/comments?id=${postId}`);
    const body = await response.json();
    const { comments } = body;
    const commentBox = document.getElementById('commetns');
    commentBox.innerHTML = '';
    comments.forEach((comment) => {
        const div = document.createElement('div');

        div.innerHTML = `
                    <div class="card" style = "margin: 15px;">
                        <div class="card-body">
                            <div class="d-flex flex-start align-items-center">
                                <div>
                                    <h6 class="fw-bold mb-0"> ${comment.username} </h6>
                                    <p class="text-muted small mb-0">
                                        ${new Date(comment.commentedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-3 markdown-body">
                                ${md.render(comment.content)}
                            </div>
                        </div>
                    </div>
                    `;
        commentBox.append(div);
    });
};

renderPost();
getcomments(postId);
