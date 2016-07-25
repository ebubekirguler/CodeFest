require 'rest-client'
require 'JSON'
response  = RestClient.post('http://localhost:3000/auth/',
{
      :accountNumber => '123456',
      :password => '123456'
})

auth = JSON.parse(response);

response = RestClient.get 'http://localhost:3000/corebanking/fecs/', {:Authorization => auth["result"]["accessToken"]}
puts response
