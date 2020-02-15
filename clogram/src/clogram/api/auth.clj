(ns clogram.api.auth
  (:require [clogram.service.user-service :as user-service]))

(defn login "Logs users base on credentials" [req] (user-service/get-user-by-id-and-password (get req :username) (get req :password)))