(ns clogram.data.user-dao
  (:require [next.jdbc :as jdbc]
            [clogram.db.core :as db]))

(defn get-user-by-username-and-password "Retrieves user by id" [username, password]
  ((with-open [con (jdbc/get-connection db/datasource)]
     (jdbc/execute-one! db/datasource ["SELECT * FROM user WHERE username=? and password=?" username password]))))