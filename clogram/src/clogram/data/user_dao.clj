(ns clogram.data.user-dao
  (:require [next.jdbc :as jdbc]
            [clogram.db.core :as db]
            [next.jdbc.result-set :as rs]))

(defn get-user "Gets user" [username]
  (jdbc/execute-one! db/datasource
                     ["SELECT * FROM user WHERE username = ?" username] {:builder-fn rs/as-unqualified-maps}))

(defn get-user-by-username-and-password "Retrieves user by username and password" [username password]
  (jdbc/execute-one! db/datasource ["SELECT * FROM user WHERE username=? AND pwd=?" username password] {:builder-fn rs/as-unqualified-maps}))

(defn create-user "Creates user" [username firstName lastName email password]
  (let [count (jdbc/execute-one! db/datasource
                                 ["INSERT INTO user(username, first_name, last_name, email, pwd) VALUES (?, ?, ?, ?, ?)" username firstName lastName email password]
                                 {:builder-fn rs/as-unqualified-maps})]
    (if (< 0 (get count :next.jdbc/update-count)) (get-user-by-username-and-password username password))))

(defn get-user-friends "Gets list of friends" [username]
  (jdbc/execute! db/datasource
                 ["SELECT * FROM user WHERE username IN (SELECT friend FROM friends WHERE friends.username=?)" username] {:builder-fn rs/as-unqualified-maps}))

(defn get-users "Gets list of friends" [username, limit]
  (jdbc/execute! db/datasource
                 ["SELECT * FROM user WHERE username LIKE ? LIMIT ?" (str username '%') (Integer/parseInt limit)] {:builder-fn rs/as-unqualified-maps}))