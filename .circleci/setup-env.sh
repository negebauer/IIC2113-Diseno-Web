touch .env

url="iic2113-web"
if [[ $1 != 'master' ]]; then
  url="${url}-staging"
fi

echo "REACT_APP_API=http://${url}.herokuapp.com/" >> .env
