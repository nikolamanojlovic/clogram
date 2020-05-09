(ns clogram.api.auth
  (:require
   [clojure.data.json :as json]
   [ring.util.request :as request-utils]
   [ring.util.response :as response-utils]
   [clogram.service.user-service :as user-service]))

(defn- get-parameters [req] (let [body (request-utils/body-string req)]
                              (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))

(defn log-in "Logs users based on credentials" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response (json/write-str (user-service/get-user-by-id-and-password (get inputs :username "") (get inputs :password ""))))
      (catch  Exception e (response-utils/status (response-utils/response "login.general.error") 401)))))


(defn sign-up "Signs up users based on provided information" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response
       (json/write-str (user-service/create-user (get inputs :username "") (get inputs :firstName "") (get inputs :lastName "") (get inputs :email "") (get inputs :password ""))))
      (catch Exception e (response-utils/status (response-utils/response "sign.up.general.error") 400)))))