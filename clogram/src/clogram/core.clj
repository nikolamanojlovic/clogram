(ns clogram.core
  (:require
   [org.httpkit.server :as server]
   [compojure.core :refer :all]
   [ring.middleware.defaults :refer :all]
   [compojure.route :as route])
  (:gen-class))

;; Application routs
(defroutes app
  (POST "/" [] "auth/login")
  (route/not-found "Error, page not found!"))

;; Main routs
(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "9002"))]
    (server/run-server (wrap-defaults #'app site-defaults) {:port port})))
