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

(defn paginate-posts "Paginate posts" [username page offset]
  (let [page (Integer/parseInt page) offset (Integer/parseInt offset)] (jdbc/execute! db/datasource
    ["SELECT post.*, user.username, user.profile_photo FROM post INNER JOIN user ON post.username = user.username 
        WHERE post.username IN (SELECT friend FROM friends WHERE friends.username=?) OR post.username=? ORDER BY post_timestamp DESC LIMIT ?, ?"
     username username (* page offset) offset]
    {:builder-fn rs/as-unqualified-maps})))


(defn create-post "Creates post" [username image description]
  (let [count (jdbc/execute-one! db/datasource
        ["INSERT INTO post(username, photo_name, photo_mime_type, photo, descrip) VALUES (?, ?, ?, ?, ?)" 
        username (get image :filename) (get image :content-type) (file->bytes (get image :tempfile)) description] {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not create post for user " username))))))


(defn get-posts-for-username "Gets posts for username" [username] 
  (jdbc/execute-one! db/datasource 
    ["SELECT post.*, user.username, user.profile_photo FROM post INNER JOIN user ON post.username = user.username WHERE username = ?" username] 
    {:builder-fn rs/as-unqualified-maps}))