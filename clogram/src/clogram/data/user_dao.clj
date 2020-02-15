(ns clogram.data.user-dao
  (:require [clogram.domain.user-repository :refer [UserRepository -find]]
            [clogram.data.user :refer [User]]
            [clojure.java.jdbc :as db]))

(defn get-user-by-id "Retrieves user by id" [username, password])