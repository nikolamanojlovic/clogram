(ns clogram.service.user-service
  (:require [clogram.data.user-dao :as user-dao]))

(defn get-user-by-id-and-password "Retrives user by id and password, returns nil if non found" [username password] ((user-dao/get-user-by-username-and-password username password)))