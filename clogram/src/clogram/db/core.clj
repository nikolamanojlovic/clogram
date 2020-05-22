(ns clogram.db.core (:require [next.jdbc :as jdbc]))

;; database url definition
; (def db {:dbtype "mysql"
;          :dbname "clogram"
;          :host "mysql_database"
;          :port 3306
;          :user "root"
;          :password "root"})

(def db {:dbtype "mysql"
         :dbname "clogram"
         :host "0.0.0.0"
         :port 3306
         :user "root"
         :password "root"})

;; return datasource from url
(def datasource (jdbc/get-datasource db))