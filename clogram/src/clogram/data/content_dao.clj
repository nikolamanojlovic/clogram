(ns clogram.data.content-dao
  (:require [next.jdbc :as jdbc]
            [clogram.db.core :as db]
            [next.jdbc.result-set :as rs]))

(defn paginate-posts "Paginate posts" [username page offset]
  (jdbc/execute-one! db/datasource
                     ["SELECT * post WHERE username IN (SELECT friend FROM friends WHERE user=?) AND username=? LIMIT ?, ?" username username page offset]
                     {:builder-fn rs/as-unqualified-maps}))


(defn create-post "Creates post" [username image description]
  (let [count (jdbc/execute-one! db/datasource
                                 ["INSERT INTO post(username, photo, descrip) VALUES (?, ?, ?)" username image description]
                                 {:builder-fn rs/as-unqualified-maps})]
    (if (= 0 (get count :next.jdbc/update-count)) (throw (Exception. (str "Could not create post for user " username))))))
