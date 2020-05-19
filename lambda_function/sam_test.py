import os
import boto3
import logging
import uuid
import traceback

TABLE_NAME = os.environ.get('TABLE_NAME', 'NewSamTest')
ENV = os.environ.get('ENV', 'local')
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def create_handler(event, context):
  '''Add Item to ${TABLE_NAME}'''

  logger.info("ENV: " + ENV + ", TABLE_NAME: " + TABLE_NAME)

  dynamodb = boto3.resource('dynamodb', endpoint_url='http://dynamodb:8000/')
  if 'local' != ENV:
    dynamodb = boto3.resource('dynamodb') # cloud

  table = dynamodb.Table(TABLE_NAME)

  try:
    response = table.put_item(
      Item = {
        'id': str(uuid.uuid4()),
        'message': 'lala'
      }
    )
  except Exception as e:
    logger.error("Error happens!")
    traceback.print_exc()
