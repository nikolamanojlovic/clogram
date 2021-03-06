(defproject clogram "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}

  :dependencies [[org.clojure/clojure "1.10.0"]
                 [compojure "1.6.1"]
                 [http-kit "2.3.0"]
                 [ring "1.7.0"]
                 [ring/ring-defaults "0.3.2"]
                 [ring-cors "0.1.13"]
                 [ring/ring-json "0.5.0"]
                 [org.clojure/data.json "0.2.6"]
                 [mysql/mysql-connector-java "5.1.6"]
                 [seancorfield/next.jdbc "1.0.13"]]

  :repl-options {:init-ns clogram.core}

  :main ^:skip-aot clogram.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})

