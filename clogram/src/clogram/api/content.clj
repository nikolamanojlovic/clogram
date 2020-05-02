(ns clogram.api.content
  (:require
   [clojure.data.json :as json]
   [ring.util.request :as request-utils]
   [clojure.walk :as walk]
   [ring.util.response :as response-utils]
   [clogram.service.content-service :as content-service]))

(extend-type java.sql.Timestamp
  json/JSONWriter
  (-write [date out]
  (json/-write (str date) out)))

(defn- get-parameters [req] 
  (let [body (request-utils/body-string req)]
      (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))

(defn paginate-posts "Paginates posts for feed" [params]
 (let [inputs (walk/keywordize-keys params)]
   (try
  (println (content-service/paginate-posts (:username inputs) (:page inputs) (:offset inputs)))
     (response-utils/response (json/write-str (content-service/paginate-posts (:username inputs) (:page inputs) (:offset inputs))))
     (catch  Exception e (println (.getMessage e))))))

(defn create-post "Creates a post for user" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/create-post (get inputs :username "") (get inputs :image "") (get inputs :description ""))))
      (catch  Exception e (response-utils/status (response-utils/response "create.post.general.error") 400)))))

(defn get-posts-for-username "Gets posts for username" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/get-posts-for-username (get inputs :username ""))))
      (catch  Exception e (response-utils/status (response-utils/response "fetch.users.post.general.error") 400)))))