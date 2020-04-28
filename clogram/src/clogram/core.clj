(ns clogram.core
  (:require
   [org.httpkit.server :as server]
   [compojure.core :refer :all]
   [ring.middleware.defaults :refer :all]
   [compojure.route :as route]
   [clogram.api.auth :as auth]
   [clogram.api.content :as content]
   [ring.util.response :as response-utils]
   [clojure.data.json :as json]
   [ring.middleware.cors :refer [wrap-cors]]
   [ring.middleware.json :refer [wrap-json-response]])
  (:gen-class))

(defroutes app
  (POST "/auth/login" req (auth/log-in req))
  (POST "/auth/signup" req (auth/sign-up req))
  (POST "/content/createPost" req (content/create-post req))
  (GET "/content/paginatePosts" [username page offset] (content/paginate-posts username page offset))
  (route/not-found (response-utils/not-found "Page not found.")))

;; Fixes CORS problem
;; Main routs
(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "9002"))]
    (server/run-server (->
                        (wrap-defaults #'app (site-defaults :security false))
                        (wrap-cors  :access-control-allow-origin [#".*"] :access-control-allow-headers ["Content-Type" "Authorization"]
                                    :access-control-allow-methods [:get :put :post :delete] :available-media-types ["application/json"]))
                       {:port port})))