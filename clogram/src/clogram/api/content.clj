(ns clogram.api.content
  (:require
   [clojure.data.json :as json]
   [ring.util.request :as request-utils]
   [clojure.walk :as walk]
   [ring.util.response :as response-utils]
   [clogram.service.content-service :as content-service]))

;; EXTEND TIMESTAMP TYPE

(extend-type java.sql.Timestamp
  json/JSONWriter
  (-write [date out]
    (json/-write (str date) out)))

(defn- get-parameters "Retreives parameters from body" [req]
  (let [body (request-utils/body-string req)]
    (if-not (clojure.string/blank? body) (json/read-str body :key-fn keyword) {})))

;; POSTS

(defn paginate-posts "Paginates posts for feed" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/paginate-posts (:username inputs) (:page inputs) (:offset inputs))))
      (catch  Exception e (response-utils/status (response-utils/response "paginate.post.general.error") 400)))))

(defn create-post "Creates a post for user" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/create-post (get inputs :username "") (get inputs :image "") (get inputs :description ""))))
      (catch  Exception e (response-utils/status (response-utils/response "create.post.general.error") 400)))))

;; PROFILE

(defn upload-profile-picture "Uploads profile picture for user" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/upload-profile-picture (get inputs :username "") (get inputs :image ""))))
      (catch  Exception e (response-utils/status (response-utils/response "create.profile.picture.general.error") 400)))))

(defn get-posts-for-username "Gets posts for username" [params]
  (let [inputs (walk/keywordize-keys params)]
    (try
      (response-utils/response (json/write-str (content-service/get-posts-for-username (get inputs :username ""))))
      (catch  Exception e (response-utils/status (response-utils/response "fetch.users.post.general.error") 400)))))

;; LIKES

(defn like-post "Like post a post by user" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response (json/write-str (content-service/like-post (get inputs :id "") (get inputs :username "") (get inputs :liked_by ""))))
      (catch  Exception e (response-utils/status (response-utils/response "like.post.general.error") 400)))))

(defn dislike-post "Dislike post a post by user" [req]
  (let [inputs (get-parameters req)]
    (try
      (response-utils/response (json/write-str (content-service/dislike-post (get inputs :id "") (get inputs :username "") (get inputs :liked_by ""))))
      (catch  Exception e (response-utils/status (response-utils/response "dislike.post.general.error") 400)))))

;; COMMENTS

(defn get-comments-for-post "Retreives all comments for provided post" [params]
(let [inputs (walk/keywordize-keys params)]
  (try
    (response-utils/response (json/write-str (content-service/get-comments-for-post (get inputs :post_id "") (get inputs :username ""))))
    (catch  Exception e (response-utils/status (response-utils/response "retreive.comments.general.error") 400)))))

(defn comment-post "Adds comment on post" [req]
(let [inputs (get-parameters req)]
  (try
    (response-utils/response (json/write-str (content-service/comment-post (get inputs :post_id "") (get inputs :username "") (get inputs :comment "") (get inputs :posted_by ""))))
    (catch  Exception e (response-utils/status (response-utils/response "comment.post.general.error") 400)))))

(defn remove-comment-from-post "Removes comment on post" [req]
(let [inputs (get-parameters req)]
  (try
    (response-utils/response (json/write-str (content-service/remove-comment-from-post (get inputs :post_id "") (get inputs :username "") (get inputs :ord ""))))
    (catch  Exception e (response-utils/status (response-utils/response "remove.comment.post.general.error") 400)))))