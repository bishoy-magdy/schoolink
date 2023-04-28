import { ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';
import Post from '../../types/post';
import PostDescription from '../../types/postDescription';

export default interface PostDAO {
    createPost(post: Post): Promise<ISqlite.RunResult<sqlite3.Statement>>,
    getPostById(id: string): Promise<any>,
    postsNumber(): Promise<any>
    postsPagination(page: number, block: number): Promise<PostDescription[]>,
}
