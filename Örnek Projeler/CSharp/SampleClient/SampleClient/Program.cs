using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SampleClient
{
    class Program
    {
        const string AuthServiceURL = @"http://localhost:3000/Auth";
        const string LoanServiceURL = @"http://localhost:3000/Loan";

        static void Main(string[] args)
        {
            //AccessToken alma işlemi
            var authResponse = DoAuthRequest();

            if (!authResponse.success)
            {
                Console.WriteLine(authResponse.message);
                return;
            }

            //Örnek GET çağrımı
            var getResponse = DoGetRequest(authResponse.result.accessToken);

            //Örnek POST çağrımı
            var postResponse = DoPostRequest(authResponse.result.accessToken);

            Console.WriteLine("GET Response:");
            Console.WriteLine(getResponse);
            Console.WriteLine("POST Response:");
            Console.WriteLine(postResponse);

            Console.ReadKey();
        }

        /// <summary>
        /// Authentication çağrımı
        /// </summary>
        /// <returns></returns>
        static Auth DoAuthRequest()
        {
            JObject data = new JObject();
            data.Add("accountNumber", 444);
            data.Add("password", "123456");

            var request = (HttpWebRequest)WebRequest.Create(AuthServiceURL);
            request.Method = WebRequestMethods.Http.Post;
            request.ContentType = "application/json";
            request.ContentLength = data.ToString().Length;

            var requestWriter = new StreamWriter(request.GetRequestStream(), System.Text.Encoding.ASCII);
            requestWriter.Write(data);
            requestWriter.Close();
            try
            {
                var webResponse = request.GetResponse();
                var webStream = webResponse.GetResponseStream();
                var responseReader = new StreamReader(webStream);
                string response = responseReader.ReadToEnd();
                responseReader.Close();

                return (Auth)JsonConvert.DeserializeObject(response, typeof(Auth));
            }
            catch (Exception ex)
            {
                return new Auth() { success = false, message = ex.Message };
            }
        }

        /// <summary>
        /// Örnek GET çağrımı
        /// </summary>
        /// <param name="accessToken">AccessToken</param>
        /// <returns></returns>
        static string DoGetRequest(string accessToken)
        {
            var request = (HttpWebRequest)WebRequest.Create(LoanServiceURL);
            request.Method = WebRequestMethods.Http.Get;
            request.ContentType = "application/json";
            request.Headers.Add("authorization", accessToken);

            try
            {
                var webResponse = request.GetResponse();
                var webStream = webResponse.GetResponseStream();
                var responseReader = new StreamReader(webStream);
                string response = responseReader.ReadToEnd();
                responseReader.Close();

                return response;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        /// <summary>
        /// Örnek POST çağrımı
        /// </summary>
        /// <param name="accessToken">AccessToken</param>
        /// <returns></returns>
        static string DoPostRequest(string accessToken)
        {
            JObject data = new JObject();
            data.Add("name", "Mehmet");
            data.Add("surname", "Akif");
            data.Add("identityNumber", "12345678901");
            data.Add("mobilePhone", 4440123);
            data.Add("mobilePhoneAreaCode", 595);
            data.Add("email", "mehmet_akif@mail.com");
            data.Add("applicationClass", "ARACBINEK2EL");
            data.Add("amount", 52400m);

            var request = (HttpWebRequest)WebRequest.Create(LoanServiceURL);
            request.Method = WebRequestMethods.Http.Post;
            request.ContentType = "application/json";
            request.ContentLength = data.ToString().Length;
            request.Headers.Add("authorization", accessToken);

            var requestWriter = new StreamWriter(request.GetRequestStream(), System.Text.Encoding.ASCII);
            requestWriter.Write(data);
            requestWriter.Close();
            try
            {
                var webResponse = request.GetResponse();
                var webStream = webResponse.GetResponseStream();
                var responseReader = new StreamReader(webStream);
                string response = responseReader.ReadToEnd();
                responseReader.Close();

                return response;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        class Auth
        {
            public bool success { get; set; }
            public string message { get; set; }
            public AuthResult result { get; set; }
        }

        class AuthResult
        {
            public string accessToken { get; set; }
            public DateTime expires { get; set; }
        }
    }
}
