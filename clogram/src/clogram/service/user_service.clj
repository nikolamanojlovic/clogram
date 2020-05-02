(ns clogram.service.user-service
  (:require [clogram.data.user-dao :as user-dao]))

(defn get-user-by-id-and-password "Retrives user by username and password" [username password]
  (let [user (user-dao/get-user-by-username-and-password username password)]
    (if-not (nil? user) user (throw (Exception. "User could not be retreived for provided data.")))))

(defn create-user "Creates user" [username firstName lastName email password]
  (user-dao/create-user username firstName lastName email password))

(defn get-user-friends "Gets list of friends" [username]
  (user-dao/get-user-friends username))