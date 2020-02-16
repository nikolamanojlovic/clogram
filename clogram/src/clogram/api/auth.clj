(ns clogram.api.auth
  (:require
   [clojure.data.json :as json]
   [ring.util.request :as request-utils]
   [clogram.service.user-service :as user-service]))

;;(defn- get-parameter [req pname]
  ;;((def body (request-utils/body-string req))
   ;;(def body-map (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {}))
   ;;(get body-map (read-string pname))))

(defn login "Logs users base on credentials" [req]
  (let [inputs (let [body (let [request req] (request-utils/body-string request))] (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {}))]
    (let [username (inputs :username) password (inputs :password)] (user-service/get-user-by-id-and-password username password))))


