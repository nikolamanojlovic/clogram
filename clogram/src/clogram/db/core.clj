(ns clogram.db.core (:require '[next.jdbc :as jdbc]))

;; database url definition
(def db {:jdbcUrl "jdbc:mysql://0.0.0.0:3306/clogram?user=root&password=root&useSSL=false"})

;; return datasource from url
(def datasource (jdbc/get-datasource db))