package com.kuveytturk.hackathon;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    final static String serviceUrl = "http://ktcodefest.azurewebsites.net";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    public void getButtonClicked(View view) {

        HackathonGetAsyncTask asyncTask = new HackathonGetAsyncTask(this);
        asyncTask.execute();
    }


    public void postButtonClicked(View view) {

        HackathonPostAsyncTask asyncTask = new HackathonPostAsyncTask(this);
        asyncTask.execute();
    }

    public void authButtonClicked(View view) {

        HackathonAuthenticationAsyncTask asyncTask = new HackathonAuthenticationAsyncTask(this);
        asyncTask.execute();
    }

    public class HackathonAuthenticationAsyncTask extends AsyncTask<Void,Void,Void>{

        Context context;
        ProgressDialog dialog;
        public HackathonAuthenticationAsyncTask(Context context) {
            this.context = context;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(context, "","Lütfen bekleyiniz..");
        }

        @Override
        protected Void doInBackground(Void... params) {

            try {
                URL url = new URL(serviceUrl + "/auth");

                HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                httpURLConnection.setRequestMethod("POST");
                httpURLConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

                JSONObject request = new JSONObject();
                request.put("accountNumber","123456");
                request.put("password","123456");

                DataOutputStream dataOutputStream = new DataOutputStream(httpURLConnection.getOutputStream());
                dataOutputStream.writeBytes(request.toString());
                dataOutputStream.close();

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));

                String nextLine;
                StringBuilder builder = new StringBuilder();
                if( (nextLine = bufferedReader.readLine()) != null){
                    builder.append(nextLine);
                }

                Log.d("KTHackathon AUTH",builder.toString());
                //json deserialization can be here

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);

            if(dialog.isShowing()){
                dialog.hide();
            }
        }
    }



    public class HackathonGetAsyncTask extends AsyncTask<Void,Void,String>{

        Context context;
        ProgressDialog dialog;
        public HackathonGetAsyncTask(Context context) {
            this.context = context;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(context, "","Lütfen bekleyiniz..");
        }

        @Override
        protected String doInBackground(Void... params) {

            try {
                URL url = new URL(serviceUrl + "/MoneyTransfer");

                HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                httpURLConnection.setRequestMethod("GET");
                httpURLConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

                String authorization = "njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3"; // auth token
                httpURLConnection.setRequestProperty("Authorization", authorization);

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));

                String nextLine;
                StringBuilder builder = new StringBuilder();
                if( (nextLine = bufferedReader.readLine()) != null){
                    builder.append(nextLine);
                }

                Log.d("KTHackathon GET",builder.toString());
                //json deserialization can be here

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(String aVoid) {
            super.onPostExecute(aVoid);

            if(dialog.isShowing()){
                dialog.hide();
            }
        }
    }

    public class HackathonPostAsyncTask extends AsyncTask<Void,Void,String>{

        Context context;
        ProgressDialog dialog;
        public HackathonPostAsyncTask(Context context) {
            this.context = context;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            dialog = ProgressDialog.show(context, "","Lütfen bekleyiniz..");
        }

        @Override
        protected String doInBackground(Void... params) {

            try {
                URL url = new URL(serviceUrl + "/MoneyTransfer");

                HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
                httpURLConnection.setRequestMethod("POST");
                httpURLConnection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

                String authorization = "njd9wng4d0ycwnn3g4d1jm30yig4d27iom5lg4d3"; // auth token
                httpURLConnection.setRequestProperty("Authorization", authorization);

                JSONObject request = new JSONObject();
                request.put("senderPhoneNumber","5555555555");
                request.put("receiverPhoneNumber","5000000000");
                request.put("amount",500);

                DataOutputStream dataOutputStream = new DataOutputStream(httpURLConnection.getOutputStream());
                dataOutputStream.writeBytes(request.toString());
                dataOutputStream.close();

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));

                String nextLine;
                StringBuilder builder = new StringBuilder();
                if( (nextLine = bufferedReader.readLine()) != null){
                    builder.append(nextLine);
                }

                Log.d("KTHackathon POST",builder.toString());
                //json deserialization can be here

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(String aVoid) {
            super.onPostExecute(aVoid);

            if(dialog.isShowing()){
                dialog.hide();
            }
        }
    }
}
