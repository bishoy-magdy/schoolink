/* eslint-env browser */

const loadPosts = async (pageNumber) => {
    const postsReq = await fetch(`/posts?page=${pageNumber}`);
    const {
        posts,
    } = await postsReq.json();
    const postsBody = document.getElementById('posts');
    postsBody.innerHTML = '';

    posts.forEach((post) => {
        const div = document.createElement('div');

        div.innerHTML = `
            <br>
            <div class="card">
                <a href='/get/post?id=${post.url}' style="text-decoration: none;">
                    <div class="card-body">
                        <h5 class="card-title" style = "color: black;">
                            ${post.title}
                        </h5>
                    </div>
                </a>
                <div class="card-footer">
                    By: ${post.username}, ${new Date(post.poastedAt).toLocaleString()}
                </div>
            </div>
                `;
        postsBody.append(div);
    });
};

const pageNumber = document.getElementById('page_number').value;

loadPosts(pageNumber);
