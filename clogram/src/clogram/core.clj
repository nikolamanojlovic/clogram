(ns clogram.core
  (:require
   [org.httpkit.server :as server]
   [compojure.core :refer :all]
   [ring.middleware.defaults :refer :all]
   [compojure.route :as route]
   [clogram.api.auth :as auth]
   [ring.util.response :as response-utils]
   [clojure.data.json :as json]
   [ring.middleware.cors :refer [wrap-cors]])
  (:gen-class))

;; Application routs
(defroutes app
  (POST "/auth/login" req  (response-utils/response (json/write-str (auth/login req))))
  (route/not-found (response-utils/not-found "Page not found.")))

;; Fixes CORS problem
;; Main routs
(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "9002"))]
    (server/run-server (->
                        (wrap-defaults #'app (site-defaults :security false))
                        (wrap-cors  :access-control-allow-origin [#".*"] :access-control-allow-headers ["Content-Type" "Authorization"]
                                    :access-control-allow-methods [:get :put :post :delete]))
                       {:port port})))