(ns clogram.service.user-service
  (:require [clogram.data.user-dao :as user-dao]))


(defn get-user-by-id-and-password "Retrives user by id and password, returns nil if non found" [username password]
  (let [user (user-dao/get-user-by-username-and-password username password)] (println user)))

;;((let [user (let [usr username pwd password] (user-dao/get-user-by-username-and-password usr pwd))]
;;((if (nil? user) (throw (Exception. "User with given credentials does not exist!")) user))))