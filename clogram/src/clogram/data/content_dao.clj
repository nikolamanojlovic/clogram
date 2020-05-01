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
    ["SELECT * FROM post WHERE username IN (SELECT friend FROM friends WHERE username=?) OR username=? ORDER BY post_timestamp DESC LIMIT ?, ?"
     username username (* page offset) offset]
    {:builder-fn rs/as-unqualified-maps})))


(defn create-post "Creates post" [username image description]
  (let [count (jdbc/execute-one! db/datasource
        ["INSERT INTO post(username, photo, descrip) VALUES (?, ?, ?)" 
        username (file->bytes (get image :tempfile)) description] {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not create post for user " username))))))
