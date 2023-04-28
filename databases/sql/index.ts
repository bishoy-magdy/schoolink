import sqlite3 from 'sqlite3';
import { open, Database, ISqlite } from 'sqlite';
import path from 'path';
import User from '../../types/user';
import Post from '../../types/post';
import Like from '../../types/like';
import Comment from '../../types/comment';
import PostDescription from '../../types/postDescription';
import DataBase from '../dao/dataBase.dao';
import ErrorManager from '../../handlers/errors/errorManager';
import * as queries from './queries';

class SQLDataBase implements DataBase {
    db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDB() {
        // open the database
        this.db = await open({
            filename: path.join(__dirname, 'schoolink.sqlite'),
            driver: sqlite3.Database,
        });

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });

        return this;
    }

    async createUser(user: User): Promise<any> {
        const { createUserQuery } = queries;
        const {
            id, firstName, lastName, username, email, authType, authValue,
        } = user;
        const userAttr = [id, firstName, lastName, username, email, authType, authValue];

        return this.db.run(createUserQuery, ...userAttr).catch(ErrorManager.SQL);
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        const { getUserByUsernameQuery } = queries;
        return this.db.get<User>(getUserByUsernameQuery, username);
    }

    async getUserById(id: string): Promise<User | undefined> {
        const { getUserByIdQuery } = queries;
        return this.db.get<User>(getUserByIdQuery, id).catch(ErrorManager.SQL);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const { getUserByEmailQuery } = queries;
        return this.db.get<User>(getUserByEmailQuery, email).catch(ErrorManager.SQL);
    }

    async createPost(post: Post): Promise<ISqlite.RunResult<sqlite3.Statement>> {
        const { createPostQuery } = queries;
        const {
            id, userId, url, title, content, poastedAt,
        } = post;
        const postAttr = [id, userId, url, title, content, poastedAt];

        return this.db.run(createPostQuery, ...postAttr).catch(ErrorManager.SQL);
    }

    async getPostById(id: string): Promise<any> {
        const { getPostByIdQuery } = queries;
        return this.db.get(getPostByIdQuery, id).catch(ErrorManager.SQL);
    }

    async postsNumber(): Promise<any> {
        const { getPostsNumberQuery } = queries;
        return this.db.get(getPostsNumberQuery).catch(ErrorManager.SQL);
    }

    // base one
    async postsPagination(page: number, block: number = 10): Promise<PostDescription[]> {
        const { postPaginationQuery } = queries;
        return this.db.all(postPaginationQuery, page, block, block).catch(ErrorManager.SQL);
    }

    async addLike(like: Like): Promise<ISqlite.RunResult<sqlite3.Statement>> {
        const { addLikeQuery } = queries;
        return this.db.run(addLikeQuery, like.userId, like.postId).catch(ErrorManager.SQL);
    }

    async getLikes(postId: string): Promise<any> {
        const { getLikesQuery } = queries;
        return this.db.get(getLikesQuery, postId).catch(ErrorManager.SQL);
    }

    async addComment(comment_: Comment): Promise<ISqlite.RunResult<sqlite3.Statement>> {
        const { addCommentsQuery } = queries;
        const {
            id, postId, userId, content: comment, commentedAt,
        } = comment_;
        const commentAttr = [id, postId, userId, comment, commentedAt];

        return this.db.run(addCommentsQuery, ...commentAttr).catch(ErrorManager.SQL);
    }

    async getComments(postId: string): Promise<any[]> {
        const { getCommentsQuery } = queries;
        return this.db.all(getCommentsQuery, postId).catch(ErrorManager.SQL);
    }

    async getAdmins(): Promise<any> {
        const { getAdminsQuery } = queries;
        return this.db.all(getAdminsQuery).catch(ErrorManager.SQL);
    }

    async isAdmin(userId: string): Promise<any> {
        const { isAdminQuery } = queries;
        return this.db.get(isAdminQuery, userId).catch(ErrorManager.SQL);
    }

    async addAdmin(userId: string): Promise<ISqlite.RunResult<sqlite3.Statement>> {
        const { addAdminQuery } = queries;
        return this.db.run(addAdminQuery, userId).catch(ErrorManager.SQL);
    }

    async removeAdmin(userId: string): Promise<ISqlite.RunResult<sqlite3.Statement>> {
        const { removeAdminQuery } = queries;
        return this.db.run(removeAdminQuery, userId).catch(ErrorManager.SQL);
    }
}

export default SQLDataBase;
