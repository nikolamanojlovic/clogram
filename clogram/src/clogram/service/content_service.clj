(ns clogram.service.content-service
  (:require [clogram.data.content-dao :as content-dao]))

;; POSTS

(defn paginate-posts "Gets posts for given username"  [username page offset]
  (content-dao/paginate-posts username page offset))

(defn create-post "Creates post for given username"  [username image description]
  (content-dao/create-post username image description))

(defn remove-post "Removes post for given id and username"  [id username]
(content-dao/remove-post id username))


;; PROFILE 

(defn upload-profile-picture "Uploads profile picture for user"  [username image]
  (content-dao/save-profile-picture username image))

(defn get-posts-for-username "Gets posts for username"  [username]
  (content-dao/get-posts-for-username username))

;; LIKES

(defn like-post "Like post" [id, username, liked_by]
  (content-dao/like-post id, username, liked_by))

(defn dislike-post "Dislike post" [id, username, liked_by]
  (content-dao/dislike-post id, username, liked_by))

;; COMMENTS

(defn get-comments-for-post "Get all comments on post" [post_id username]
  (content-dao/get-comments-for-post post_id username))

(defn comment-post "Comment post" [post_id username comment posted_by]
  (content-dao/add-comment-on-post post_id username comment posted_by))

(defn remove-comment-from-post "Removes comment from post" [post_id username ord]
  (content-dao/delete-comment-on-post post_id username ord))