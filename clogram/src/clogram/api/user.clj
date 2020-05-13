(ns clogram.api.user
  (:require
   [clojure.data.json :as json]
   [ring.util.response :as response-utils]
   [ring.util.request :as request-utils]
   [clojure.walk :as walk]
   [clogram.service.user-service :as user-service]))

(defn- get-parameters [req]
  (let [body (request-utils/body-string req)]
    (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))

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

(defn delete-user "Delete user" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response (json/write-str (user-service/delete-user (get inputs :username ""))))
      (catch  Exception e (response-utils/status (response-utils/response "user.delete.general.error") 400)))))

(defn search-for-users "Get list of users that username matches" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (user-service/search-for-users (get inputs :username "") (get inputs :current "") (get inputs :limit ""))))
      (catch  Exception e (response-utils/status (response-utils/response "user.friends.general.error") 400)))))

(defn follow "Follows user as a friend" [req]
(let [inputs (get-parameters req)]
  (try
    (response-utils/response (json/write-str (user-service/follow (get inputs :username "") (get inputs :friend ""))))
    (catch  Exception e (response-utils/status (response-utils/response "user.follow.general.error") 400)))))

(defn unfollow "Unfollows user" [req]
(let [inputs (get-parameters req)]
  (try
    (response-utils/response (json/write-str (user-service/unfollow (get inputs :username "") (get inputs :friend ""))))
    (catch  Exception e (response-utils/status (response-utils/response "user.unfollow.general.error") 400)))))