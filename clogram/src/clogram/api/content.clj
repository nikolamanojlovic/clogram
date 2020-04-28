(ns clogram.api.content
  (:require
   [clojure.data.json :as json]
   [ring.util.request :as request-utils]
   [clojure.data.json :as json]
   [ring.util.response :as response-utils]
   [clogram.service.content-service :as content-service]))

(defn- get-parameters [req] (let [body (request-utils/body-string req)]
                              (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))

(defn paginate-posts "Paginates posts for feed" [username page offset]
  (try
    (response-utils/response (json/write-str (content-service/paginate-posts username page offset)))
    (catch  Exception e (response-utils/status (response-utils/response "paginate.posts.general.error") 400))))

(defn create-post "Creates a post for user" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response (json/write-str (content-service/create-post (get inputs :username "") (get inputs :image "") (get inputs :description ""))))
      (catch  Exception e (response-utils/status (response-utils/response "create.post.general.error") 400)))))