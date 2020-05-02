(ns clogram.api.user
    (:require
     [clojure.data.json :as json]
     [ring.util.request :as request-utils]
     [clojure.data.json :as json]
     [ring.util.response :as response-utils]
     [clojure.walk :as walk]
     [clogram.service.user-service :as user-service]))
  
  (defn- get-parameters [req] (let [body (request-utils/body-string req)]
                                (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))
  
  (defn get-user-friends "Gets list of friends" [params]
    (let [inputs (walk/keywordize-keys params)]
      (try
        (response-utils/response (json/write-str (user-service/get-user-friends (get inputs :username ""))))
        (catch  Exception e (response-utils/status (response-utils/response "user.friends.general.error") 400)))))