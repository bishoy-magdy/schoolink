import AdminDAO from './admin.dao';
import CommentDAO from './comment.dao';
import LikeDAO from './like.dao';
import PostDAO from './post.dao';
import UserDAO from './user.dao';

export default interface DataBase extends UserDAO, AdminDAO, PostDAO, LikeDAO, CommentDAO {}
