###############################################################################
##
##  Copyright (C) 2014 Tavendo GmbH
##
##  Licensed under the Apache License, Version 2.0 (the "License");
##  you may not use this file except in compliance with the License.
##  You may obtain a copy of the License at
##
##      http://www.apache.org/licenses/LICENSE-2.0
##
##  Unless required by applicable law or agreed to in writing, software
##  distributed under the License is distributed on an "AS IS" BASIS,
##  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
##  See the License for the specific language governing permissions and
##  limitations under the License.
##
###############################################################################

import os
import datetime
import sqlite3
import datetime
from time import sleep


from twisted.python import log
from twisted.enterprise import adbapi
from twisted.internet.defer import inlineCallbacks

from autobahn import wamp
from autobahn.twisted.wamp import ApplicationSession
from autobahn.wamp.exception import ApplicationError
from autobahn.wamp.types import PublishOptions


## WAMP application component with our app code.
##
class VoteGameBackend(ApplicationSession):

   def __init__(self, config):
      ApplicationSession.__init__(self)
      self.config = config
      self.init_db()


   def init_db(self):
      if not os.path.isfile(self.config.extra['dbfile']):
         log.msg("Initializing database ..")

         db = sqlite3.connect(self.config.extra['dbfile'])
         cur = db.cursor()

         cur.execute("""
                     CREATE TABLE users (

                        created             TEXT   NOT NULL,
                        updated             TEXT   NOT NULL,
                        email              TEXT     NOT NULL,
                        alias              TEXT     NOT NULL,
                        current           INTEGER     NOT NULL,

                        PRIMARY KEY (email))
                     """)

         cur.execute("""
                    CREATE TABLE enities (
                       entity_id            INTEGER PRIMARY KEY AUTOINCREMENT,
                       created             TEXT   NOT NULL,
                       updated             TEXT   NOT NULL,
                       name              TEXT     NOT NULL,
                       location          TEXT     NOT NULL,
                       cash           INTEGER     NOT NULL,
                       health          INTEGER     NOT NULL,
                       max_health          INTEGER     NOT NULL)

                    """)


         cur.execute("""
                      CREATE TABLE votes (
                         item              TEXT     NOT NULL,
                         count             INTEGER   NOT NULL,
                         PRIMARY KEY (item))
                      """)

         for item in self.config.extra['items']:
            cur.execute("INSERT INTO votes (item, count) VALUES (?, ?)", [item, 0])
         db.commit()

         db.close()
         log.msg("Database initialized.")

      else:
         log.msg("Database already exists.")

      self.db = adbapi.ConnectionPool('sqlite3', self.config.extra['dbfile'], check_same_thread = False)
      log.msg("Database opened.")


   @wamp.procedure("com.votegame.get_votes")
   def get_votes(self):
      def run(txn):
         txn.execute("SELECT item, count FROM votes")
         res = {}
         for row in txn.fetchall():
            res[row[0]] = row[1]
         return res
      return self.db.runInteraction(run)

   @wamp.procedure("com.votegame.signup")
   def signup(self, email):
       #if not item in self.config.extra['items']:
       #   raise ApplicationError("com.votegame.error.no_such_item", "no item '{}' to vote on".format(item))

       def run(txn):
          now = datetime.datetime.utcnow()
          ## FIXME: make the following into 1 (atomic) SQL statement
          ## => does SQLite feature "UPDATE .. RETURNING"?
          txn.execute("INSERT INTO users (email, created, updated, alias, current) VALUES (?, ?, ?, ?, ?)", [email, now.strftime("%Y-%m-%dT%H:%M:%SZ"),now.strftime("%Y-%m-%dT%H:%M:%SZ"),'anon','7'])
          #txn.execute("SELECT count FROM votes WHERE item = ?", [item])
          #count = int(txn.fetchone()[0])
          count = 777

          #self.publish("com.votegame.onvote", item, count,
          #   options = PublishOptions(excludeMe = False))

          return count

       return self.db.runInteraction(run)

   @wamp.procedure("com.votegame.vote")
   def vote(self, item):
      if not item in self.config.extra['items']:
         raise ApplicationError("com.votegame.error.no_such_item", "no item '{}' to vote on".format(item))

      def run(txn):
         ## FIXME: make the following into 1 (atomic) SQL statement
         ## => does SQLite feature "UPDATE .. RETURNING"?
         txn.execute("UPDATE votes SET count = count + 1 WHERE item = ?", [item])
         txn.execute("SELECT count FROM votes WHERE item = ?", [item])
         count = int(txn.fetchone()[0])

         self.publish("com.votegame.onvote", item, count,
            options = PublishOptions(excludeMe = False))

         return count

      return self.db.runInteraction(run)

   @wamp.procedure("com.votegame.move")
   def move(self, id, x, y):

      def run(txn):
         self.publish("com.votegame.onmove", id, x, y,
            options = PublishOptions(excludeMe = False))

         return id

      return self.db.runInteraction(run)


   @inlineCallbacks
   def onJoin(self, details):

      def onvote(item, count):
         print("New vote on '{}': {}".format(item, count))

      yield self.subscribe(onvote, 'com.votegame.onvote')

      def onmove(id, x, y):
         print("New move for '{}' on '{}': '{}'".format(id, x, y))

      yield self.subscribe(onmove, 'com.votegame.onmove')

      try:
         regs = yield self.register(self)
         print("Ok, registered {} procedures.".format(len(regs)))
      except Exception as e:
         print("Failed to register procedures: {}".format(e))

      print("VoteGame Backend ready!")



   def onDisconnect(self):
      reactor.stop()



def make(config):
   ##
   ## This component factory creates instances of the
   ## application component to run.
   ##
   ## The function will get called either during development
   ## using the ApplicationRunner below, or as  a plugin running
   ## hosted in a WAMPlet container such as a Crossbar.io worker.
   ##
   if config:
      return VoteGameBackend(config)
   else:
      ## if no config given, return a description of this WAMPlet ..
      return {'label': 'VoteGame Service WAMPlet',
              'description': 'This is the backend WAMP application component of VoteGame.'}



if __name__ == '__main__':
   from autobahn.twisted.wamp import ApplicationRunner

   extra = {
      "dbfile": "votegame.db",
      "items": ["banana", "lemon", "grapefruit"]
   }

   ## test drive the component during development ..
   runner = ApplicationRunner(
      url = "ws://localhost:8080/ws",
      realm = "realm1",
      extra = extra,
      debug = False,       ## low-level WebSocket debugging
      debug_wamp = False,  ## WAMP protocol-level debugging
      debug_app = True)    ## app-level debugging

   runner.run(make)
