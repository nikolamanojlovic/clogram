(ns clogram.api.user
    (:require
     [clojure.data.json :as json]
     [ring.util.response :as response-utils]
     [clojure.walk :as walk]
     [clogram.service.user-service :as user-service]))
  
(defn get-user "Gets user" [params]
  (let [inputs (walk/keywordize-keys params)]
      (try
        (response-utils/response (json/write-str (user-service/get-user (get inputs :username ""))))
        (catch  Exception e (response-utils/status (response-utils/response "user.general.error") 400)))))

  (defn get-user-friends "Gets list of friends" [params]
    (let [inputs (walk/keywordize-keys params)]
      (try
        (response-utils/response (json/write-str (user-service/get-user-friends (get inputs :username ""))))
        (catch  Exception e (response-utils/status (response-utils/response "user.friends.general.error") 400)))))

  (defn search-for-users "Get list of users that username matches" [params]
    (let [inputs (walk/keywordize-keys params)]
      (try
        (response-utils/response (json/write-str (user-service/search-for-users (get inputs :username "") (get inputs :limit ""))))
        (catch  Exception e (response-utils/status (response-utils/response "user.friends.general.error") 400)))))