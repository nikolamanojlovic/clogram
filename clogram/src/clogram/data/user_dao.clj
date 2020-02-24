(ns clogram.data.user-dao
  (:require [next.jdbc :as jdbc]
            [clogram.db.core :as db]
            [next.jdbc.result-set :as rs]))

;;(defn get-user-by-username-and-password "Retrieves user by username and password" [username password]
  ;;(jdbc/execute-one! db/datasource ["SELECT * FROM user WHERE username=? AND pwd=?" username password] {:return-keys true}))

(defn get-user-by-username-and-password "Retrieves user by username and password" [username password]
  (jdbc/execute-one! db/datasource ["SELECT * FROM user WHERE username=? AND pwd=?" username password] {:builder-fn rs/as-unqualified-maps}))