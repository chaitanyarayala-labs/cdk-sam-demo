# import json

def lambda_handler(event, context):
  message = event.get('message', 'default mess')
  print('Debug: event ' + message)
  return {
    "headers": {
      "lala": "haha"
    },
    "statusCode": 200,
    "body": "李一萌"
  }
