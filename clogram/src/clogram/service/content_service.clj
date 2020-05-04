(ns clogram.service.content-service
  (:require [clogram.data.content-dao :as content-dao]))

(defn paginate-posts "Creates post for given username"  [username page offset]
  (content-dao/paginate-posts username page offset))

(defn create-post "Creates post for given username"  [username image description]
  (content-dao/create-post username image description))

(defn get-posts-for-username "Gets posts for username"  [username]
  (content-dao/get-posts-for-username username))

(defn like-post "Like post" [id, username, liked_by]
  (content-dao/like-post id, username, liked_by))

(defn dislike-post "Dislike post" [id, username, liked_by]
  (content-dao/dislike-post id, username, liked_by))