import Like from '../../types/like';

export default interface LikeDAO {
    addLike(like: Like): Promise<any>,
    getLikes(postId: string): Promise<any>,
}
