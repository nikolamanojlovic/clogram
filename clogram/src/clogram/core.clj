(ns clogram.core
  (:require
   [org.httpkit.server :as server]
   [compojure.core :refer [defroutes POST GET]]
   [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
   [ring.middleware.params :refer [wrap-params]]
   [ring.middleware.multipart-params :refer [wrap-multipart-params]]
   [compojure.route :as route]
   [clogram.api.auth :as auth]
   [clogram.api.content :as content]
   [clogram.api.user :as user]
   [ring.util.response :as response-utils]
   [ring.middleware.cors :refer [wrap-cors]])
  (:gen-class))

(defroutes app
  ;; AUTH RELATED API
  (POST "/auth/login" req (auth/log-in req))
  (POST "/auth/signup" req (auth/sign-up req))

  ;; USER RELATED API
  (wrap-params (GET "/user" params (user/get-user (:query-params params))))
  (wrap-params (GET "/user/friends" params (user/get-user-friends (:query-params params))))
  (wrap-params (GET "/user/search" params (user/search-for-users (:query-params params))))
  (POST "/user/delete" req (user/delete-user req))
  (POST "/user/follow" req (user/follow req))
  (POST "/user/unfollow" req (user/unfollow req))

  ;; CONTENT RELATED API
  ;; POSTS
  (wrap-multipart-params (POST "/content/createPost" req (content/create-post (:multipart-params req))))
  (wrap-params (GET "/content/paginatePosts" params (content/paginate-posts (:query-params params))))

  ;; PROFILE
  (wrap-multipart-params (POST "/content/uploadProfilePicture" req (content/upload-profile-picture (:multipart-params req))))
  (wrap-params (GET "/content/fetchPostsForUser" params (content/get-posts-for-username (:query-params params))))

  ;; LIKES
  (POST "/content/likePost" req (content/like-post req))
  (POST "/content/dislikePost" req (content/dislike-post req))

  ;; COMMENTS
  (wrap-params (GET "/content/comments" params (content/get-comments-for-post (:query-params params))))
  (POST "/content/addComment" req (content/comment-post req))
  (POST "/content/removeComment" req (content/remove-comment-from-post req))

  ;; FALLBACK
  (route/not-found (response-utils/not-found "Page not found.")))

;; Fixes CORS problem
;; Main routs
(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "9002"))]
    (server/run-server (->
                        (wrap-defaults #'app (site-defaults :security false))
                        (wrap-multipart-params)
                        (wrap-cors  :access-control-allow-origin [#".*"] :access-control-allow-headers ["Content-Type" "Authorization"]
                                    :access-control-allow-methods [:get :put :post :delete] :available-media-types ["multipart/form-data" "application/json"]))
                       {:port port})))