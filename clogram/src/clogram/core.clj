(ns clogram.core
  (:require
   [org.httpkit.server :as server]
   [compojure.core :refer :all]
   [ring.middleware.defaults :refer :all]
   [ring.middleware.params :refer :all]
   [ring.middleware.multipart-params :refer :all]
   [compojure.route :as route]
   [clogram.api.auth :as auth]
   [clogram.api.content :as content]
   [clogram.api.user :as user]
   [ring.util.response :as response-utils]
   [clojure.data.json :as json]
   [ring.middleware.cors :refer [wrap-cors]]
   [ring.middleware.json :refer [wrap-json-response]])
  (:gen-class))

(defroutes app
  (POST "/auth/login" req (auth/log-in req))
  (POST "/auth/signup" req (auth/sign-up req))

  (wrap-params (GET "/user/friends" params (user/get-user-friends (:query-params params))))

  (wrap-multipart-params (POST "/content/createPost" req (content/create-post (:multipart-params req))))
  (wrap-params (GET "/content/paginatePosts" params (content/paginate-posts (:query-params params))))
  (wrap-params (GET "/content/fetchPostsForUser" params (content/get-posts-for-username (:query-params params))))
  (POST "/content/likePost" req (content/like-post req))
  (POST "/content/dislikePost" req (content/dislike-post req))

  (route/not-found (response-utils/not-found "Page not found.")))

;; Fixes CORS problem
;; Main routs
(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "9002"))]
    (server/run-server (->
                        (wrap-defaults #'app (site-defaults :security false))
                        (wrap-cors  :access-control-allow-origin [#".*"] :access-control-allow-headers ["Content-Type" "Authorization"]
                                    :access-control-allow-methods [:get :put :post :delete] :available-media-types ["multipart/form-data" "application/json"]))
                       {:port port})))