git clone https://github.com/negebauer/IIC2113-Api.git ../api
(
  cd ../api
  if [[ $(git rev-parse --verify $1) ]];
  then
    git checkout $1
  else
    git checkout dev
  fi
  bundle install --jobs=4 --retry=3 --path vendor/bundle
  sudo apt install postgresql-client
  bundle exec rake db:reset
  bundle exec rake db:seed
  rails s & echo 'Running api'
)
