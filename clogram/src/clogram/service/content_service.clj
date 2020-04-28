(ns clogram.service.content-service
  (:require [clogram.data.content-dao :as content-dao]))

(defn paginate-posts "Creates post for given username"  [username page offset]
  (content-dao/paginate-posts username page offset))

(defn create-post "Creates post for given username"  [username image description]
  (content-dao/create-post username image description))