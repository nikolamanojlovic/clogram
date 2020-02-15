(ns clogram.domain.user)

(defrecord User [username first-name last-name email password image])

(defn get-user-by-id "Retrieves user by id" [username, password])