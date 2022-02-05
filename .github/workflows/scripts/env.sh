#!/bin/bash 

echo REACT_APP_HOST_URL=${{ secrets.REACT_APP_HOST_URL }} >> .env
echo REACT_APP_API_URL=${{ secrets.REACT_APP_API_URL }}>> .env
