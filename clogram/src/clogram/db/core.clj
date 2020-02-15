(ns clogram.db.core (:require [next.jdbc :as jdbc]))

;; database url definition
(def db {:dbtype "mysql"
         :dbname "clogram"
         :host "172.17.0.2"
         :port 3306
         :user "root"
         :password "root"})

;; return datasource from url
(def datasource (jdbc/get-datasource db))