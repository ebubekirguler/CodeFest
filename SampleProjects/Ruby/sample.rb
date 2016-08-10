require 'rest-client'
require 'JSON'
response  = RestClient.post('http://ktcodefest.azurewebsites.net/auth/',
{
      :accountNumber => '123456',
      :password => '123456'
})

auth = JSON.parse(response);

response = RestClient.get 'http://ktcodefest.azurewebsites.net/corebanking/fecs/', {:Authorization => auth["result"]["accessToken"]}
puts response
