(ns clogram.data.content-dao
  (:require [next.jdbc :as jdbc]
            [clogram.db.core :as db]
            [clojure.java.io :as io]
            [next.jdbc.result-set :as rs]))


(defn- file->bytes [file]
  (with-open [xin (io/input-stream file)
              xout (java.io.ByteArrayOutputStream.)]
    (io/copy xin xout)
    (.toByteArray xout)))

;; POSTS

(defn paginate-posts "Paginate posts" [username page offset]
  (let [page (Integer/parseInt page) offset (Integer/parseInt offset)] (jdbc/execute! db/datasource
      ["SELECT post.*, user.username, user.profile_photo, COUNT(likes.ord) AS num_of_likes, COUNT(comments.ord) AS num_of_comments, GROUP_CONCAT(likes.liked_by) AS liked_by
        FROM post INNER JOIN user ON post.username = user.username 
          LEFT JOIN likes ON post.id = likes.id AND post.username = likes.username
          LEFT JOIN comments ON post.id = comments.id AND post.username = comments.username
        WHERE post.username IN (SELECT friend FROM friends WHERE friends.username=?) OR post.username=?
        GROUP BY post.id, post.username ORDER BY post.post_timestamp DESC" username username] {:builder-fn rs/as-unqualified-maps})))

(defn create-post "Creates post" [username image description]
  (let [count (jdbc/execute-one! db/datasource
    ["INSERT INTO post(username, photo_name, photo_mime_type, photo, descrip) VALUES (?, ?, ?, ?, ?)"
      username (get image :filename) (get image :content-type) (file->bytes (get image :tempfile)) description] {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not create post for user " username))))))

;; PROFILE

(defn save-profile-picture "Saves profile picture for user" [username image]
(let [count (jdbc/execute-one! db/datasource
    ["UPDATE user SET profile_photo=? WHERE username = ?" (file->bytes (get image :tempfile)) username] {:builder-fn rs/as-unqualified-maps})]
  (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not save profile picture for user" username))))))

(defn get-posts-for-username "Gets posts for username" [username]
(jdbc/execute! db/datasource
   ["SELECT post.*, user.username, user.profile_photo FROM post INNER JOIN user ON post.username = user.username WHERE post.username = ? 
       ORDER BY post_timestamp DESC" username] {:builder-fn rs/as-unqualified-maps}))

;; LIKES

(defn like-post "Like post" [id, username, liked_by]
  (let [on (+ (get (jdbc/execute-one! db/datasource ["SELECT COUNT(*) AS count FROM likes WHERE id = ? AND username = ?" id, username] {:builder-fn rs/as-unqualified-maps}) :count) 1)]
    (let [count (jdbc/execute-one! db/datasource
       ["INSERT INTO likes(id, username, ord, liked_by) VALUES (?, ?, ?, ?)" id username on liked_by] {:builder-fn rs/as-unqualified-maps})]
      (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not like post " id " for user " username " by user " liked_by)))))))

(defn dislike-post "Dislike post" [id, username, liked_by]
  (let [count (jdbc/execute-one! db/datasource
      ["DELETE FROM likes WHERE id = ? AND username = ? AND liked_by = ?" id username liked_by] {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not dislike post " id " for user " username " by user " liked_by))))))

;; COMMENTS

(defn get-comments-for-post "Gets comments for post id and username" [id username]
(jdbc/execute! db/datasource
   ["SELECT comments.* FROM comments LEFT JOIN post ON comments.id = post.id AND comments.username = post.username WHERE post.id = ? AND post.username = ? 
       ORDER BY comment_timestamp DESC" username] {:builder-fn rs/as-unqualified-maps}))

(defn add-comment-on-post "Adds comment on post" [id username comment posted_by]
(let [on (+ (get (jdbc/execute-one! db/datasource ["SELECT COUNT(*) AS count FROM comments WHERE id = ? AND username = ?" id, username] {:builder-fn rs/as-unqualified-maps}) :count) 1)]
  (let [count (jdbc/execute-one! db/datasource
     ["INSERT INTO comments(id, username, ord, comment_text, posted_by) VALUES (?, ?, ?, ?, ?)" id username on comment posted_by] {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could post a comment on post " id " for user " username " by user " posted_by)))))))

(defn delete-comment-on-post "Dislike post" [id username ord]
(let [count (jdbc/execute-one! db/datasource
    ["DELETE FROM comments WHERE id = ? AND username = ? AND ord = ?" id username ord] {:builder-fn rs/as-unqualified-maps})]
  (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not delete  comment " id " for user " username))))))
