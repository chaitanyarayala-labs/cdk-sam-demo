import boto3
import logging

def health_check(event, context):
  # get the service resource
  dynamodb = boto3.resource('dynamodb', endpoint_url='http://dynamodb:8000/')

  table = dynamodb.Table('NewSamTest')

