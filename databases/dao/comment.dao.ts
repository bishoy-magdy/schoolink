import { ISqlite } from 'sqlite';
import sqlite3 from 'sqlite3';
import Comment from '../../types/comment';

export default interface CommentDAO {
    addComment(comment: Comment): Promise<ISqlite.RunResult<sqlite3.Statement>>,
    getComments(postId: string): Promise<any>,
}
