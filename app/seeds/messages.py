from app.models import db, Message, environment, SCHEMA
from datetime import datetime, timedelta


def seed_messages():
  message1 = Message(
    sender_id = '1',
    recipient_id = '2',
    message = 'Hey there',
    timestamp = datetime.now() - timedelta(hours=9)
  )
  message2 = Message(
    sender_id = '2',
    recipient_id = '3',
    message = 'Hey there',
    timestamp = datetime.now() - timedelta(hours=9)
  )
  message3 = Message(
    sender_id = '3',
    recipient_id = '1',
    message = 'Hey there',
    timestamp = datetime.now() - timedelta(hours=9)
  )

  db.session.add(message1)
  db.session.add(message2)
  db.session.add(message3)
  db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()